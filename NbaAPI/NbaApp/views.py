from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from basketball_reference_scraper.seasons import get_schedule
from basketball_reference_scraper.teams import get_roster_stats
import pandas as pd
import os
import pickle

import json


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


@csrf_exempt
def scheduleApi(request, scheduleId=0):
    if request.method == 'GET':
        data = get_schedule(2022, playoffs=False)
        return JsonResponse(data.to_json(date_format='iso'), safe=False)


@csrf_exempt
def predictionApi(request, scheduleId=0):
    print("heelo")
    if request.method == 'GET':
        data = getStats('Boston Celtics','Miami Heat')
        y = data.to_json()
        return JsonResponse(y, safe=False)


def getStats(team1,team2):
    #path = os.path.dirname(os.path.dirname(os.getcwd()))
    #path= path+r"\NBA-Vision\src\assets\ML"
    leagueStats = pd.read_excel(r"C:\Users\Jugra\Desktop\School\Year 4\Semester 2\Honours Project\CSI4900-Project\CSI4900-Project\NBA-Vision\src\assets\ML\teamStatsFilled.xlsx")
    leagueStats = leagueStats.drop(leagueStats.columns[0],1)
    team1Stats = leagueStats.loc[(leagueStats['team'] == team1 )]
    team1Stats=team1Stats.reset_index()
    team2Stats = leagueStats.loc[(leagueStats['team'] == team1 )]
    team2Stats=team2Stats.reset_index()
    combinedStats = pd.read_csv(r"C:\Users\Jugra\Desktop\School\Year 4\Semester 2\Honours Project\CSI4900-Project\CSI4900-Project\NBA-Vision\src\assets\ML\template.csv")
    combinedStats.at[0,'team'] = normalizedName(team1Stats.at[0,'team'])
    combinedStats.at[0,'made_field_goals'] = team1Stats.at[0,'made_field_goals']
    combinedStats.at[0,'attempted_field_goals'] = team1Stats.at[0,'attempted_field_goals']
    combinedStats.at[0,'made_three_point_field_goals'] = team1Stats.at[0,'made_three_point_field_goals']
    combinedStats.at[0,'attempted_three_point_field_goals'] = team1Stats.at[0,'attempted_three_point_field_goals']
    combinedStats.at[0,'made_free_throws'] = team1Stats.at[0,'made_free_throws']
    combinedStats.at[0,'attempted_free_throws'] = team1Stats.at[0,'attempted_free_throws']
    combinedStats.at[0,'offensive_rebounds'] = team1Stats.at[0,'offensive_rebounds']
    combinedStats.at[0,'defensive_rebounds'] = team1Stats.at[0,'defensive_rebounds']
    combinedStats.at[0,'assists'] = team1Stats.at[0,'assists']
    combinedStats.at[0,'steals'] = team1Stats.at[0,'steals']
    combinedStats.at[0,'blocks'] = team1Stats.at[0,'blocks']
    combinedStats.at[0,'turnovers'] = team1Stats.at[0,'turnovers']
    combinedStats.at[0,'personal_fouls'] = team1Stats.at[0,'personal_fouls']
    combinedStats.at[0,'location'] = 1
    combinedStats.at[0,'opponent'] = normalizedName(team2Stats.at[0,'team'])
    combinedStats.at[0,'elo'] = team1Stats.at[0,'elo']
    combinedStats.at[0,'defRating'] = team1Stats.at[0,'defRating']
    combinedStats.at[0,'team2'] = normalizedName(team2Stats.at[0,'team'])
    combinedStats.at[0,'made_field_goals2'] = team2Stats.at[0,'made_field_goals']
    combinedStats.at[0,'attempted_field_goals2'] = team2Stats.at[0,'attempted_field_goals']
    combinedStats.at[0,'made_three_point_field_goals2'] = team2Stats.at[0,'made_three_point_field_goals']
    combinedStats.at[0,'attempted_three_point_field_goals2'] = team2Stats.at[0,'attempted_three_point_field_goals']
    combinedStats.at[0,'made_free_throws2'] = team2Stats.at[0,'made_free_throws']
    combinedStats.at[0,'attempted_free_throws2'] = team2Stats.at[0,'attempted_free_throws']
    combinedStats.at[0,'offensive_rebounds2'] = team2Stats.at[0,'offensive_rebounds']
    combinedStats.at[0,'defensive_rebounds2'] = team2Stats.at[0,'defensive_rebounds']
    combinedStats.at[0,'assists2'] = team2Stats.at[0,'assists']
    combinedStats.at[0,'steals2'] = team2Stats.at[0,'steals']
    combinedStats.at[0,'blocks2'] = team2Stats.at[0,'blocks']
    combinedStats.at[0,'turnovers2'] = team2Stats.at[0,'turnovers']
    combinedStats.at[0,'personal_fouls2'] = team2Stats.at[0,'personal_fouls']
    combinedStats.at[0,'location2'] = 0
    combinedStats.at[0,'opponent2'] = normalizedName(team1Stats.at[0,'team'])
    combinedStats.at[0,'elo2'] = team2Stats.at[0,'elo']
    combinedStats.at[0,'defRating2'] = team2Stats.at[0,'defRating']

    combinedStats.assign(outcome="")
    
    combinedStats.at[0,"outcome"]=predict(combinedStats)

    return combinedStats

def predict (combinedStats):
    path = r"C:\Users\Jugra\Desktop\School\Year 4\Semester 2\Honours Project\CSI4900-Project\CSI4900-Project\NBA-Vision\src\assets\ML\model.pkl"
    with open(path, 'rb') as file: 
        Pickled_LR_Model = pickle.load(file)

    return Pickled_LR_Model.predict(combinedStats)[0]

def normalizedName(teamName):
    
        if teamName =="Atlanta Hawks":
            return 0
        elif teamName =="Boston Celtics":
            return 1
        elif teamName =="Cleveland Cavaliers":
            return 5
        elif teamName =="New Orleans Pelicans":
            return 18
        elif teamName =="Chicago Bulls":
            return 4
        elif teamName =="Dallas Mavericks":
            return 26
        elif teamName == "Denver Nuggets":
            return 7
        elif teamName == "Golden State Warriors":
            return 9
        elif teamName == "Houston Rockets":
            return 10
        elif teamName == "Los Angeles Clippers":
            return 12
        elif teamName == "Los Angeles Lakers":
            return 13
        elif teamName == "Miami Heat":
            return 15
        elif teamName == "Milwaukee Bucks":
            return 16
        elif teamName ==  "Minnesota Timberwolves":
            return 17
        elif teamName ==  "Brooklyn Nets":
            return 2
        elif teamName ==  "New York Knicks":
            return 19
        elif teamName ==  "Orlando Magic":
            return 21
        elif teamName ==  "Indiana Pacers":
            return 11
        elif teamName ==  "Philadelphia 76ers":
            return 22
        elif teamName ==  "Phoenix Suns":
            return 23
        elif teamName ==  "Portland Trail Blazers":
            return 24
        elif teamName ==  "Sacramento Kings":
            return 25
        elif teamName ==  "San Antonio Spurs":
            return 26
        elif teamName ==  "Oklahoma City Thunder":
            return 20
        elif teamName ==  "Toronto Raptors":
            return 27
        elif teamName ==  "Utah Jazz":
            return 28
        elif teamName ==  "Memphis Grizzlies":
            return 14
        elif teamName ==  "Washington Wizards":
            return 29
        elif teamName ==  "Detroit Pistons":
            return 8
        elif teamName == "Charlotte Hornets":
            return 3

