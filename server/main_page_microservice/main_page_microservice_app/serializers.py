from rest_framework import serializers
from .models import NewsArticle, Match, Team


class NewsArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsArticle
        fields = ['id', 'title', 'text', 'image', 'created_at']

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['team_home', 'team_away', 'score_home', 'score_away', 'location', 'division', 'video_url']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['name', 'logo_url']