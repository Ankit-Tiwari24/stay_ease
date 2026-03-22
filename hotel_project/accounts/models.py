from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('guest', 'Guest'),
        ('manager', 'Hotel Manager'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='guest')
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} ({self.email})"

class OTP(models.Model):
    PURPOSE_CHOICES = (
        ('signup', 'Signup Verification'),
        ('payment', 'Payment Verification'),
    )
    email = models.EmailField()
    otp_code = models.CharField(max_length=6)
    purpose = models.CharField(max_length=20, choices=PURPOSE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.otp_code} for {self.email} ({self.purpose})"
