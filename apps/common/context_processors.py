from .models import BannerImage

def banners(request):
    return{
        "banners": BannerImage.objects.all().filter(is_active=True)     
    }