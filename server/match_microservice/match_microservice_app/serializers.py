from rest_framework import serializers
from .models import Match


class MatchSerializer(serializers.ModelSerializer):
    team_away_name = serializers.SerializerMethodField()
    team_away_logo_url = serializers.SerializerMethodField()

    class Meta:
        model = Match
        fields = ['id', 'team_home', 'team_away_name', 'team_away_logo_url', 'score_home', 'score_away', 'location', 'division', 'video_url', 'match_date', 'match_time']

    def get_team_away_name(self, obj):
        return obj.team_away_name

    def get_team_away_logo_url(self, obj):
        return obj.team_away_logo_url

class MatchCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['team_home', 'team_away_name', 'team_away_logo_url', 'score_home', 'score_away', 'location', 'division', 'video_url', 'match_date', 'match_time']


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['video_url']