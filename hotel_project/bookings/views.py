

from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.core.mail import send_mail

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def process_booking(request):
    data = request.data
    hotel_name = data.get('hotel_name', 'StayEase Premium Hotel')
    check_in = data.get('check_in')
    check_out = data.get('check_out')
    
    subject = f"Booking Confirmation: {hotel_name}"
    message = f"Hello {request.user.username},\n\nYour payment was successful and your booking is confirmed!\n\nHotel: {hotel_name}\nDates: {check_in} to {check_out}\n\nComplimentary Note: Please enjoy a free welcome cocktail upon your arrival at our lounge. We look forward to hosting you!\n\nBest Regards,\nStayEase Team"
    
    send_mail(
        subject,
        message,
        'bookings@stayease.com',
        [request.user.email],
        fail_silently=False,
    )
    
    return Response({"message": "Booking successful and email sent!"}, status=status.HTTP_200_OK)
