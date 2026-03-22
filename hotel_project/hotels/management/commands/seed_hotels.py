from django.core.management.base import BaseCommand
from hotels.models import Hotel

class Command(BaseCommand):
    help = 'Seed initial hotels data'

    def handle(self, *args, **kwargs):
        hotels_data = [
            {
                "name": "Luxury Ocean Villa",
                "location": "Maldives",
                "price": 3500,
                "star_rating": 5,
                "image_url": "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
                "available": True
            },
            {
                "name": "Alpine Peak Chalet",
                "location": "Swiss Alps",
                "price": 4200,
                "star_rating": 4,
                "image_url": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
                "available": True
            },
            {
                "name": "The Grand Times Square",
                "location": "New York",
                "price": 5500,
                "star_rating": 5,
                "image_url": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
                "available": True
            },
            {
                "name": "Eco Jungle Paradise",
                "location": "Costa Rica",
                "price": 2800,
                "star_rating": 4,
                "image_url": "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2070&auto=format&fit=crop",
                "available": True
            },
            {
                "name": "Majestic Taj Palace",
                "location": "Mumbai",
                "price": 6000,
                "star_rating": 5,
                "image_url": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop",
                "available": True
            },
            {
                "name": "Regal Plaza",
                "location": "London",
                "price": 7500,
                "star_rating": 5,
                "image_url": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1000&q=80",
                "available": True
            },
            {
                "name": "Kyoto Serenity Inn",
                "location": "Kyoto",
                "price": 3200,
                "star_rating": 4,
                "image_url": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1000&q=80",
                "available": True
            },
            {
                "name": "Desert Rose Resort",
                "location": "Dubai",
                "price": 8500,
                "star_rating": 5,
                "image_url": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1000&q=80",
                "available": True
            },
            {
                "name": "Mediterranean Azure",
                "location": "Greece",
                "price": 4800,
                "star_rating": 5,
                "image_url": "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1000&q=80",
                "available": True
            },
            {
                "name": "Sydney Harbour Suites",
                "location": "Sydney",
                "price": 5200,
                "star_rating": 4,
                "image_url": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1000&q=80",
                "available": True
            },
            {
                "name": "Balinese Garden Villa",
                "location": "Bali",
                "price": 2200,
                "star_rating": 4,
                "image_url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&q=80",
                "available": True
            },
            {
                "name": "Parisian Chic Hotel",
                "location": "Paris",
                "price": 6800,
                "star_rating": 5,
                "image_url": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1000&q=80",
                "available": True
            },
            {
                "name": "Venetian Canal Palace",
                "location": "Venice",
                "price": 7200,
                "star_rating": 5,
                "image_url": "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=1000&q=80",
                "available": True
            },
            {
                "name": "Neon Heights Shibuya",
                "location": "Tokyo",
                "price": 4900,
                "star_rating": 4,
                "image_url": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1000&q=80",
                "available": True
            },
            {
                "name": "Safari Horizon Lodge",
                "location": "Kenya",
                "price": 3100,
                "star_rating": 4,
                "image_url": "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1000&q=80",
                "available": True
            }
        ]
        
        for data in hotels_data:
            Hotel.objects.get_or_create(
                name=data['name'],
                defaults=data
            )
        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {len(hotels_data)} hotels'))
