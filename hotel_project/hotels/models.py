from django.db import models

class Hotel(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=200)
    star_rating = models.IntegerField(default=3)
    image_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

class RoomType(models.Model):
    name = models.CharField(max_length=100) # e.g., Deluxe, Suite, Standard
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name

class Room(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='rooms')
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE)
    room_number = models.CharField(max_length=50)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.hotel.name} - {self.room_type.name} ({self.room_number})"
