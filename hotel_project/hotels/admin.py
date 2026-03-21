from django.contrib import admin # type: ignore # pyre-ignore
from .models import Hotel, RoomType, Room # type: ignore # pyre-ignore

admin.site.register(Hotel)
admin.site.register(RoomType)
admin.site.register(Room)
