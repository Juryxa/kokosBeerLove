from rest_framework import serializers
from .models import Player, AboutFcKokoc


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'


class AboutFcKokocSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutFcKokoc
        fields = ['games_played', 'wins', 'goals_scored', 'tournaments', 'about_text']
