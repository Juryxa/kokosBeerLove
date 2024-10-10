from rest_framework import serializers
from .models import Match, AboutFcKokoc
import json

class MatchSerializer(serializers.ModelSerializer):
    team_away_name = serializers.SerializerMethodField()
    team_away_logo_url = serializers.SerializerMethodField()

    class Meta:
        model = Match
        fields = ['team_home', 'team_away_name', 'team_away_logo_url', 'score_home', 'score_away', 'location', 'division', 'video_url', 'match_date', 'match_time']

    def get_team_away_name(self, obj):
        return json.loads(obj.team_away_info).get("name")

    def get_team_away_logo_url(self, obj):
        return json.loads(obj.team_away_info).get("logo_url")


class MatchCreateSerializer(serializers.ModelSerializer):
    team_away_name = serializers.CharField()  # Поле для названия гостевой команды
    team_away_logo_url = serializers.URLField()  # Поле для логотипа гостевой команды

    class Meta:
        model = Match
        fields = ['team_home', 'team_away_name', 'team_away_logo_url', 'score_home', 'score_away', 'location', 'division', 'video_url', 'match_date', 'match_time']

    def create(self, validated_data):
        # Извлекаем название и логотип команды
        team_away_name = validated_data.pop('team_away_name').lower()
        team_away_logo_url = validated_data.pop('team_away_logo_url')

        # Формируем JSON для поля team_away_info
        team_away_info = json.dumps({
            "name": team_away_name,
            "logo_url": team_away_logo_url
        })

        # Создаем новый матч
        match = Match.objects.create(
            team_away_info=team_away_info,
            **validated_data
        )
        return match


class AboutFcKokocSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutFcKokoc
        fields = ['games_played', 'wins', 'goals_scored', 'tournaments', 'about_text']
