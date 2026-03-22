from rest_framework import serializers
from .models import Booking, Payment
from hotels.serializers import HotelSerializer
import re
from datetime import datetime

class PaymentSerializer(serializers.Serializer):
    card_number = serializers.CharField(max_length=16, min_length=16)
    expiry_date = serializers.CharField(max_length=7)
    cvv = serializers.CharField(max_length=4, min_length=3)
    card_holder_name = serializers.CharField(max_length=100)

    def validate_card_number(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Card number must be numeric.")
        return value

    def validate_cvv(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("CVV must be numeric.")
        return value

    def validate_card_holder_name(self, value):
        if not re.match(r'^[A-Za-z\s]+$', value):
            raise serializers.ValidationError("Name must contain only alphabets and spaces.")
        return value

    def validate_expiry_date(self, value):
        match = re.match(r'^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$', value)
        if not match:
            raise serializers.ValidationError("Expiry date must be in MM/YY or MM/YYYY format.")
        
        month, year_str = match.groups()
        month = int(month)
        year = 2000 + int(year_str) if len(year_str) == 2 else int(year_str)
        
        now = datetime.now()
        if year < now.year or (year == now.year and month < now.month):
            raise serializers.ValidationError("Card has expired.")
        return value

class PaymentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ['created_at']

class BookingSerializer(serializers.ModelSerializer):
    hotel_details = HotelSerializer(source='hotel', read_only=True)
    
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['user', 'status', 'total_price']
