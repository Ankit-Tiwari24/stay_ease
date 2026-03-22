from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.utils import timezone
from .models import CustomUser, ContactMessage, OTP
from .serializers import (
    UserSerializer, 
    UserProfileSerializer, 
    ContactMessageSerializer,
    OTPSerializer,
    OTPVerifySerializer
)
import random

class SendOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = OTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            purpose = serializer.validated_data['purpose']
            
            if purpose == 'signup' and CustomUser.objects.filter(email=email).exists():
                return Response({"error": "User with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Generate 6-digit OTP
            otp_code = str(random.randint(100000, 999999))
            
            # Save OTP to DB
            OTP.objects.filter(email=email, purpose=purpose).delete() # Delete old ones
            OTP.objects.create(email=email, otp_code=otp_code, purpose=purpose)
            
            # Send Email
            subject = f"Your StayEase OTP Code - {purpose.title()}"
            message = f"Your verification code is: {otp_code}\nThis code will expire in 5 minutes."
            
            try:
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )
                return Response({"message": "OTP sent successfully"}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": f"Failed to send email: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifySignupOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        otp_serializer = OTPVerifySerializer(data=request.data)
        user_serializer = UserSerializer(data=request.data)
        
        if otp_serializer.is_valid() and user_serializer.is_valid():
            email = otp_serializer.validated_data['email']
            otp_code = otp_serializer.validated_data['otp_code']
            
            otp_obj = OTP.objects.filter(
                email=email, 
                otp_code=otp_code, 
                purpose='signup',
                is_verified=False
            ).last()
            
            if not otp_obj:
                return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Check expiry (5 mins)
            if (timezone.now() - otp_obj.created_at).total_seconds() > 300:
                return Response({"error": "OTP has expired"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Mark verified and create user
            otp_obj.is_verified = True
            otp_obj.save()
            user_serializer.save()
            
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
            
        return Response({
            "otp_errors": otp_serializer.errors,
            "user_errors": user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = ContactMessageSerializer
