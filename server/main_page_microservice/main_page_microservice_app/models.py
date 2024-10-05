from django.db import models
from django.utils import timezone

class NewsArticle(models.Model):
    title = models.CharField(max_length=255)
    text = models.TextField()
    image = models.ImageField(upload_to='news_images/')
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'main_page_news_articles'

    def __str__(self):
        return self.title
