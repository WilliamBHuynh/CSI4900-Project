from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from NbaApp.models import Games
from NbaApp.serializers import GameSerializer


@csrf_exempt
def gameApi(request, gameId=0):
    if request.method == 'GET':
        games = Games.objects.all()
        games_serializer = GameSerializer(games, many=True)
        return JsonResponse(games_serializer.data, safe=False)
    elif request.method == 'POST':
        game_data = JSONParser().parse(request)
        game_serializer = GameSerializer(data=game_data)
        if game_serializer.is_valid():
            game_serializer.save()
            return JsonResponse("Added Game successfully.", safe=False)
        return JsonResponse("Failed to add Game.", safe=False)
    elif request.method == 'PUT':
        game_data = JSONParser().parse(request)
        game = Games.objects.get(GameId=game_data['GameId'])
        game_serializer = GameSerializer(game, data=game_data)
        if game_serializer.is_valid():
            game_serializer.save()
            return JsonResponse("Updated Game successfully.", safe=False)
        return JsonResponse("Failed to update Game.", safe=False)
    elif request.method == 'DELETE':
        game = Games.objects.get(GameId=gameId)
        game.delete()
        return JsonResponse("Deleted Game successfully", safe=False)
