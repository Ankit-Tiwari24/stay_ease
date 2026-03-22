from django.conf import settings  # type: ignore
from rest_framework import viewsets, status  # type: ignore
from rest_framework.permissions import IsAuthenticated  # type: ignore
from rest_framework.response import Response  # type: ignore
from rest_framework.views import APIView  # type: ignore
from django.core.mail import send_mail  # type: ignore
from django.utils import timezone  # type: ignore
from .models import Booking, Payment  # type: ignore
from .serializers import BookingSerializer  # type: ignore
from accounts.models import OTP  # type: ignore
from accounts.serializers import OTPSerializer, OTPVerifySerializer  # type: ignore
import random

class SendPaymentOTPView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = OTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            purpose = serializer.validated_data['purpose']
            
            # Generate 6-digit OTP
            otp_code = str(random.randint(100000, 999999))
            
            # Save OTP to DB
            OTP.objects.filter(email=email, purpose=purpose).delete()
            OTP.objects.create(email=email, otp_code=otp_code, purpose=purpose)
            
            # Send Email
            subject = "StayEase Payment Verification"
            message = f"Your payment verification code is: {otp_code}\nThis code will expire in 5 minutes."
            
            try:
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )
                return Response({"message": "Payment OTP sent successfully"}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": f"Failed to send email: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyPaymentOTPView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = OTPVerifySerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp_code = serializer.validated_data['otp_code']
            
            otp_obj = OTP.objects.filter(
                email=email, 
                otp_code=otp_code, 
                purpose='payment',
                is_verified=False
            ).last()
            
            if not otp_obj:
                return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)
            
            if (timezone.now() - otp_obj.created_at).total_seconds() > 300:
                return Response({"error": "OTP has expired"}, status=status.HTTP_400_BAD_REQUEST)
            
            otp_obj.is_verified = True
            otp_obj.save()
            
            return Response({"message": "Payment verified successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Users can only see their own bookings
        return Booking.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        # 1. Calculate total price and save booking as confirmed
        hotel = serializer.validated_data['hotel']
        check_in = serializer.validated_data['check_in']
        check_out = serializer.validated_data['check_out']
        nights = (check_out - check_in).days
        total_price = hotel.price * nights if nights > 0 else hotel.price
        
        booking = serializer.save(user=self.request.user, status='Confirmed', total_price=total_price)
        
        # 2. Extract payment info from request if available
        # Card details are only used to verify/extract meta-data, not stored.
        raw_card_number = self.request.data.get('card_number', '0000000000001234')
        last_four = str(raw_card_number).replace(' ', '')[-4:]  # type: ignore
        
        # 3. Create Payment record for Django Admin audit
        import uuid
        Payment.objects.create(
            booking=booking,
            transaction_id=str(uuid.uuid4()), # Generate unique ID
            amount=total_price,
            payment_status='Success',
            card_last_four=last_four
        )

        # 4. Send Confirmation Email
        subject = f"Booking Confirmation: {booking.hotel.name}"
        message = (
            f"Hello {self.request.user.username},\n\n"
            f"Your payment was successful and your booking is confirmed!\n\n"
            f"Hotel: {booking.hotel.name}\n"
            f"Location: {booking.hotel.location}\n"
            f"Dates: {booking.check_in} to {booking.check_out}\n\n"
            f"Complimentary Note: Please enjoy a free welcome cocktail upon your arrival at our lounge. We look forward to hosting you!\n\n"
            f"Best Regards,\nStayEase Team"
        )
        
        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [self.request.user.email],
                fail_silently=True,
            )
        except Exception as e:
            pass # Fail silently if email fails in dev


