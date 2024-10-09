from django.db import models
from django.utils import timezone

class NewsArticle(models.Model):
    title = models.CharField(max_length=500)
    text = models.TextField()
    image = models.CharField(max_length=500)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'news_articles'

    def str(self):
        return self.title


class Match(models.Model):
    team_home = models.CharField(max_length=500)
    team_away = models.CharField(max_length=500)
    score_home = models.IntegerField()
    score_away = models.IntegerField()
    location = models.CharField(max_length=500)
    division = models.CharField(max_length=500)
    video_url = models.URLField(max_length=1000, blank=True, null=True)

    def __str__(self):
        return f"{self.team_home} vs {self.team_away}"


class Team(models.Model):
    name = models.CharField(max_length=255)  # Название команды
    logo_url = models.URLField(max_length=1000)  # URL лога команды

    def __str__(self):
        return self.name

