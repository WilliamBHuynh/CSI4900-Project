from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from NBA.models import Games
from NBA.serializers import GamesSerializer


@csrf_exempt
def gameApi(request, id=0):
    if request.method == 'GET':
        games = Games.objects.all()
        games_serializer = GamesSerializer(games, many=True)
        return JsonResponse(games_serializer.data, safe=False)
    elif request.method == 'POST':
