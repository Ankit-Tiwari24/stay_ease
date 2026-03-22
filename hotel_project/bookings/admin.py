from django.contrib import admin
from .models import Booking, Payment

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'hotel', 'check_in', 'check_out', 'status', 'total_price', 'created_at')
    list_filter = ('status', 'hotel')
    search_fields = ('user__username', 'hotel__name')

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('transaction_id', 'booking', 'amount', 'payment_status', 'created_at')
    list_filter = ('payment_status',)
    search_fields = ('transaction_id', 'booking__user__username')
