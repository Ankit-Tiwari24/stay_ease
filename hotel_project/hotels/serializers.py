from rest_framework import serializers
from .models import Hotel, Review

class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Review
        fields = ['id', 'username', 'rating', 'comment', 'created_at']

class HotelSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    reviews_count = serializers.IntegerField(source='reviews.count', read_only=True)
    
    class Meta:
        model = Hotel
        fields = '__all__'
