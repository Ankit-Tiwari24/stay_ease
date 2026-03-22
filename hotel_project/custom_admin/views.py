from rest_framework import viewsets, permissions  # type: ignore
from rest_framework.views import APIView  # type: ignore
from rest_framework.response import Response  # type: ignore
from django.db.models import Sum  # type: ignore
from accounts.models import CustomUser, ContactMessage  # type: ignore
from hotels.models import Hotel, Review  # type: ignore
from bookings.models import Booking  # type: ignore
from accounts.serializers import UserSerializer, UserProfileSerializer, ContactMessageSerializer  # type: ignore
from hotels.serializers import HotelSerializer  # type: ignore
from bookings.serializers import BookingSerializer  # type: ignore

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_staff

class DashboardStatsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        revenue_agg = Booking.objects.filter(status='Confirmed').aggregate(Sum('total_price'))
        revenue_val = 0
        if isinstance(revenue_agg, dict):
            revenue_val = revenue_agg.get('total_price__sum') or 0
        elif isinstance(revenue_agg, (int, float)):
            revenue_val = revenue_agg

        stats = {
            'total_users': CustomUser.objects.count(),
            'total_bookings': Booking.objects.count(),
            'total_hotels': Hotel.objects.count(),
            'total_reviews': Review.objects.count(),
            'total_messages': ContactMessage.objects.count(),
            'revenue': revenue_val,
            'recent_activity': BookingSerializer(Booking.objects.all().order_by('-created_at')[:5], many=True).data
        }
        return Response(stats)

class AdminUserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = CustomUser.objects.all().order_by('-date_joined')
    serializer_class = UserProfileSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return UserSerializer
        return UserProfileSerializer

class AdminBookingViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        status_val = request.data.get('status')
        if status_val:
            instance.status = status_val
            instance.save()
            return Response(self.get_serializer(instance).data)
        return super().partial_update(request, *args, **kwargs)

class AdminHotelViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Hotel.objects.all().order_by('-id')
    serializer_class = HotelSerializer

class AdminContactMessageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
    http_method_names = ['get', 'delete', 'head', 'options']
