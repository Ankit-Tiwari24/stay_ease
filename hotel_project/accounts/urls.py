from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RegisterView, 
    UserProfileView, 
    ContactMessageCreateView,
    SendOTPView,
    VerifySignupOTPView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('send-otp/', SendOTPView.as_view(), name='send-otp'),
    path('verify-signup-otp/', VerifySignupOTPView.as_view(), name='verify-signup-otp'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('contact/', ContactMessageCreateView.as_view(), name='contact'),
]
