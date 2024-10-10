from django.db import models
import json


class Match(models.Model):
    team_home = models.CharField(max_length=500)
    team_away_info = models.TextField(default='{"name": "", "logo_url": ""}')
    score_home = models.IntegerField()
    score_away = models.IntegerField()
    location = models.CharField(max_length=500)
    division = models.CharField(max_length=500)
    video_url = models.URLField(max_length=1000, blank=True, null=True)
    match_date = models.DateField(verbose_name="Дата матча", blank=True, null=True)
    match_time = models.TimeField(verbose_name="Время матча", blank=True, null=True)

    def __str__(self):
        return f"{self.team_home} vs {self.get_team_away_name()} on {self.match_date} at {self.match_time}"

    def get_team_away_name(self):
        return json.loads(self.team_away_info).get("name")

    def get_team_away_logo_url(self):
        return json.loads(self.team_away_info).get("logo_url")

