from django.db import models

class NewsArticle(models.Model):
    title = models.CharField(max_length=255)
    image = models.BinaryField()
    text = models.TextField()

    class Meta:
        db_table = 'main_page_news_articles'

    def __str__(self):
        return self.title
