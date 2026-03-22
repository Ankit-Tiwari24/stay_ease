from django.db import models

class Hotel(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=2000)
    star_rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.0)
    image = models.ImageField(upload_to='hotels/', null=True, blank=True)
    available = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Review(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE)
    rating = models.IntegerField(default=5)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s review for {self.hotel.name}"
