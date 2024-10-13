from django.db import models
from django.utils import timezone


class NewsArticle(models.Model):
    title = models.CharField(max_length=500)
    text = models.TextField()
    image_url = models.CharField(max_length=500)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = "news_articles"

    def str(self):
        return self.title
