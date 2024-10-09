from django.db import models

class Match(models.Model):
    about_text = models.TextField(verbose_name="Информация о команде", blank=True, null=True)
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


class AboutFcKokoc(models.Model):
    games_played = models.IntegerField(verbose_name="Количество игр", default=0)
    wins = models.IntegerField(verbose_name="Победы", default=0)
    goals_scored = models.IntegerField(verbose_name="Голы", default=0)
    tournaments = models.IntegerField(verbose_name="Турниры", default=0)
    about_text = models.TextField(verbose_name="Информация о команде", blank=True, null=True)

    class Meta:
        verbose_name = "О клубе"
        verbose_name_plural = "О клубе"

    def __str__(self):
        return f"Информация о команде (Игры: {self.games_played}, Победы: {self.wins})"

