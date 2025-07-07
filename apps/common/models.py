from django.db import models

class BannerImage(models.Model):
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='banner_images/')
    is_active = models.BooleanField(default= True)
    created_at = models.DateTimeField(auto_now_add = True)
    
    def __str__(self):
        return self.title
