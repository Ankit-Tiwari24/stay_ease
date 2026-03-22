from django.contrib import admin
from .models import Hotel

@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'price', 'star_rating', 'available')
    search_fields = ('name', 'location')
    list_filter = ('available', 'star_rating')
