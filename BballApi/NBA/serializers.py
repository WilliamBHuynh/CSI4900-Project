from rest_framework import serializers
from NBA.models import Games


class GamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Games
        fields = ('GameId',
                  'HomeTeam',
                  'VisitorTeam')
