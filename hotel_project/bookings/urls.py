from django.urls import path
from .views import process_booking

urlpatterns = [
    path('process_booking/', process_booking, name='process_booking'),
]
