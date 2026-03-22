from django.urls import path, include  # type: ignore
from rest_framework.routers import DefaultRouter  # type: ignore
from .views import BookingViewSet, SendPaymentOTPView, VerifyPaymentOTPView  # type: ignore

router = DefaultRouter()
router.register(r'', BookingViewSet, basename='booking')

urlpatterns = [
    path('send-payment-otp/', SendPaymentOTPView.as_view(), name='send-payment-otp'),
    path('verify-payment-otp/', VerifyPaymentOTPView.as_view(), name='verify-payment-otp'),
    path('', include(router.urls)),
]
