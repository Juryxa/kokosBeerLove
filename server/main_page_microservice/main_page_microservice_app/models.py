from django.db import models

class News(models.Model):
    title = models.CharField(max_length=255)
    publication_date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='news_images/', blank=True, null=True)
    text = models.TextField()

    class Meta:
        db_table = 'main_page_news'

    def __str__(self):
        return self.title