from rest_framework import serializers
from NbaApp.models import Games


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Games
        fields = ('GameId',
                  'HomeTeamName',
                  'VisitTeamName',
                  'HomeTeamPts',
                  'VisitTeamPts')
