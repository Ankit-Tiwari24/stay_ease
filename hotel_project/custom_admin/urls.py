from django.urls import path, include
from rest_framework.routers import DefaultRouter
from custom_admin.views import (
    DashboardStatsView, AdminUserViewSet, 
    AdminBookingViewSet, AdminHotelViewSet, 
    AdminContactMessageViewSet
)

router = DefaultRouter()
router.register(r'users', AdminUserViewSet, basename='admin-users')
router.register(r'bookings', AdminBookingViewSet, basename='admin-bookings')
router.register(r'hotels', AdminHotelViewSet, basename='admin-hotels')
router.register(r'contacts', AdminContactMessageViewSet, basename='admin-contacts')

urlpatterns = [
    path('stats/', DashboardStatsView.as_view(), name='admin-stats'),
    path('', include(router.urls)),
]
