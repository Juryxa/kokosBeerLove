from rest_framework import serializers
from .models import Match, Team, AboutFcKokoc


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'logo_url']


class MatchSerializer(serializers.ModelSerializer):
    team_away = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())
    class Meta:
        model = Match
        fields = ['team_home', 'team_away', 'score_home', 'score_away', 'location', 'division', 'video_url', 'match_date', 'match_time']



class AboutFcKokocSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutFcKokoc
        fields = ['games_played', 'wins', 'goals_scored', 'tournaments', 'about_text']