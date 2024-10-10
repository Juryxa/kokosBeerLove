from rest_framework import serializers
from .models import Match


class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['team_home', 'team_away_name', 'team_away_logo_url', 'score_home', 'score_away', 'location', 'division', 'video_url', 'match_date', 'match_time']


class MatchCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['team_home', 'team_away_name', 'team_away_logo_url', 'score_home', 'score_away', 'location', 'division', 'video_url', 'match_date', 'match_time']
