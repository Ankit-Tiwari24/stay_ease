import os
import requests
import django
from django.core.files import File
from tempfile import NamedTemporaryFile

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hotel_project.settings')
django.setup()

from hotels.models import Hotel

# Vetted high-quality Unsplash URLs (No humans, no food, no animals)
vetted_urls = [
    "https://images.unsplash.com/photo-1722763529109-2bcb289a47c3?q=80&w=2000",
    "https://images.unsplash.com/photo-1718066236069-a4d42a6436a1?q=80&w=2000",
    "https://images.unsplash.com/photo-1709431511158-0dce8198ecb1?q=80&w=2000",
    "https://images.unsplash.com/photo-1739590269025-07766e4ab657?q=80&w=2000",
    "https://images.unsplash.com/photo-1766371900913-1f9fee835af7?q=80&w=2000",
    "https://images.unsplash.com/photo-1771775529138-a7a20ba7e032?q=80&w=2000",
    "https://images.unsplash.com/photo-1599056517506-d9a6f4b7bfde?q=80&w=2000",
    "https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?q=80&w=2000",
    "https://images.unsplash.com/photo-1604371204849-43ee087a05d3?q=80&w=2000",
    "https://images.unsplash.com/photo-1580870858053-8d0764624f4f?q=80&w=2000",
    "https://images.unsplash.com/photo-1769679716068-5635941548f8?q=80&w=2000",
    "https://images.unsplash.com/photo-1742472406678-d3a088e5b9f1?q=80&w=2000",
    "https://images.unsplash.com/photo-1708165544769-46495044b90f?q=80&w=2000",
    "https://images.unsplash.com/photo-1607738714816-ad790e98a864?q=80&w=2000",
    "https://images.unsplash.com/photo-1641957993107-5337fecc75fa?q=80&w=2000",
    "https://images.unsplash.com/photo-1753898464732-85e0f3df8a53?q=80&w=2000",
    "https://images.unsplash.com/photo-1607739448572-8fc95778d8ed?q=80&w=2000",
    "https://images.unsplash.com/photo-1625186969426-99a65731543a?q=80&w=2000",
    "https://images.unsplash.com/photo-1547148820-77220cc9de00?q=80&w=2000",
    "https://images.unsplash.com/photo-1740834205010-e12c38e5ca0a?q=80&w=2000"
]

def update_hotel_images():
    hotels = Hotel.objects.all()
    print(f"Updating {len(hotels)} hotels...")
    
    for i, hotel in enumerate(hotels):
        url = vetted_urls[i % len(vetted_urls)]
        print(f"Downloading image for {hotel.name} from {url}...")
        
        try:
            response = requests.get(url, stream=True)
            if response.status_code == 200:
                img_temp = NamedTemporaryFile(delete=True, mode='wb')
                for chunk in response.iter_content(chunk_size=128):
                    img_temp.write(chunk)
                img_temp.flush()
                
                # Delete existing image if any
                if hotel.image:
                    hotel.image.delete(save=False)
                
                # Assign new image
                hotel.image.save(f"hotel_{hotel.id}.jpg", File(img_temp), save=True)
                print(f"Successfully updated {hotel.name}")
            else:
                print(f"Failed to download image for {hotel.name}: Status {response.status_code}")
        except Exception as e:
            print(f"Error updating {hotel.name}: {e}")

if __name__ == "__main__":
    update_hotel_images()
