from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from basketball_reference_scraper.seasons import get_schedule, get_standings
from basketball_reference_scraper.teams import get_roster_stats
from nba_api.stats.endpoints import teamdashboardbyteamperformance
import pandas as pd
import os
import pickle
from datetime import datetime;


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
def standingApi(request):
    if request.method == 'GET':
        data = get_standings()
        data["EASTERN_CONF"]['DIV'] = 'east'
        data["WESTERN_CONF"]['DIV'] = 'west'
        res = pd.concat([data["EASTERN_CONF"], data["WESTERN_CONF"]], ignore_index=True)
        return JsonResponse(res.to_json(), safe=False)

@csrf_exempt
def scheduleApi(request):
    if request.method == 'GET':
        data = get_schedule(2022, playoffs=False)
        return JsonResponse(data.to_json(date_format='iso'), safe=False)



@csrf_exempt
def predictionApi(request, scheduleId=0):
    if request.method == 'GET':
        data = get_schedule(2022, playoffs=False)
        today = datetime.today().strftime('%Y-%m-%d')
        gamesToday = data.loc[(data['DATE'] == today )]
        gamesToday.reset_index(drop=True, inplace=True)
        predData = getStats(gamesToday.at[0,"HOME"],gamesToday.at[0,"VISITOR"]) 
        for index,row in gamesToday.iterrows():
            if index > 0 :
                predToAppend = getStats(gamesToday.at[index,"HOME"],gamesToday.at[index,"VISITOR"])
                predData=predData.append(predToAppend)
        predData.reset_index(drop=True, inplace=True)
        y = predData.to_json()
        return JsonResponse(y, safe=False)
    if request.method == 'POST':
        print("test")


def getStats(team1,team2):
    #path = os.path.dirname(os.path.dirname(os.getcwd()))
    #path= path+r"\NBA-Vision\src\assets\ML"
    team1ids=normalizedName(team1)
    team2ids=normalizedName(team2)

    team1Stats = teamdashboardbyteamperformance.TeamDashboardByTeamPerformance(team1ids[1],per_mode_detailed='PerGame')
    team1Stats = team1Stats.overall_team_dashboard.get_data_frame()
    team1Stats.reset_index(drop=True, inplace=True)

    team2Stats = teamdashboardbyteamperformance.TeamDashboardByTeamPerformance(team2ids[1],per_mode_detailed='PerGame')
    team2Stats = team2Stats.overall_team_dashboard.get_data_frame()
    team2Stats.reset_index(drop=True, inplace=True)

    #leagueStats = pd.read_excel(r"C:\Users\Jugra\Desktop\School\Year 4\Semester 2\Honours Project\CSI4900-Project\CSI4900-Project\NBA-Vision\src\assets\ML\teamStatsFilled.xlsx")
    #leagueStats = leagueStats.drop(leagueStats.columns[0],1)
    #team1Stats = leagueStats.loc[(leagueStats['team'] == team1 )]
    #team1Stats=team1Stats.reset_index()
    #team2Stats = leagueStats.loc[(leagueStats['team'] == team2 )]
    #team2Stats=team2Stats.reset_index()
    combinedStats = pd.read_csv(r"C:\Users\Jugra\Desktop\School\Year 4\Semester 2\Honours Project\CSI4900-Project\CSI4900-Project\NBA-Vision\src\assets\ML\template.csv")
    combinedStats.at[0,'team'] = team1ids[0]
    combinedStats.at[0,'FGM'] = team1Stats.at[0,'FGM']
    combinedStats.at[0,'FGA'] = team1Stats.at[0,'FGA']
    combinedStats.at[0,'TPM'] = team1Stats.at[0,'FG3M']
    combinedStats.at[0,'TPA'] = team1Stats.at[0,'FG3A']
    combinedStats.at[0,'FTM'] = team1Stats.at[0,'FTM']
    combinedStats.at[0,'FTA'] = team1Stats.at[0,'FTA']
    combinedStats.at[0,'OR'] = team1Stats.at[0,'OREB']
    combinedStats.at[0,'DR'] = team1Stats.at[0,'DREB']
    combinedStats.at[0,'AS'] = team1Stats.at[0,'AST']
    combinedStats.at[0,'STL'] = team1Stats.at[0,'STL']
    combinedStats.at[0,'BLK'] = team1Stats.at[0,'BLK']
    combinedStats.at[0,'TO'] = team1Stats.at[0,'TOV']
    combinedStats.at[0,'PF'] = team1Stats.at[0,'PF']
    combinedStats.at[0,'LOC'] = 1
    combinedStats.at[0,'OPP'] = team2ids[0]
    combinedStats.at[0,'ELO'] = 1500
    combinedStats.at[0,'DEF'] = team1Stats.at[0,'FGA'] - team1Stats.at[0,'OREB'] + team1Stats.at[0,'TOV']
    combinedStats.at[0,'team2'] = team2ids[0]
    combinedStats.at[0,'FGM2'] = team2Stats.at[0,'FGM']
    combinedStats.at[0,'FGA2'] = team2Stats.at[0,'FGA']
    combinedStats.at[0,'TPM2'] = team2Stats.at[0,'FG3M']
    combinedStats.at[0,'TPA2'] = team2Stats.at[0,'FG3A']
    combinedStats.at[0,'FTM2'] = team2Stats.at[0,'FTM']
    combinedStats.at[0,'FTA2'] = team2Stats.at[0,'FTA']
    combinedStats.at[0,'OR2'] = team2Stats.at[0,'OREB']
    combinedStats.at[0,'DR2'] = team2Stats.at[0,'DREB']
    combinedStats.at[0,'AS2'] = team2Stats.at[0,'AST']
    combinedStats.at[0,'STL2'] = team2Stats.at[0,'STL']
    combinedStats.at[0,'BLK2'] = team2Stats.at[0,'BLK']
    combinedStats.at[0,'TO2'] = team2Stats.at[0,'TOV']
    combinedStats.at[0,'PF2'] = team2Stats.at[0,'PF']
    combinedStats.at[0,'LOC2'] = 0
    combinedStats.at[0,'OPP2'] = team1ids[0]
    combinedStats.at[0,'ELO2'] = 1500
    combinedStats.at[0,'DEF2'] = 1


    combinedStats.assign(outcome="")
    
    combinedStats.at[0,"OUTCOME"]=predict(combinedStats)

    return combinedStats

def predict (combinedStats):
    path = r"C:\Users\Jugra\Desktop\School\Year 4\Semester 2\Honours Project\CSI4900-Project\CSI4900-Project\NBA-Vision\src\assets\ML\model.pkl"
    with open(path, 'rb') as file: 
        Pickled_LR_Model = pickle.load(file)

    return Pickled_LR_Model.predict(combinedStats)[0]

def normalizedName(teamName):
    
        if teamName =="Atlanta Hawks":
            return [0,1610612737]
        elif teamName =="Boston Celtics":
            return [1,1610612738]
        elif teamName =="Cleveland Cavaliers":
            return [5,1610612739]
        elif teamName =="New Orleans Pelicans":
            return [18,1610612740]
        elif teamName =="Chicago Bulls":
            return [4,1610612741]
        elif teamName =="Dallas Mavericks":
            return [26,1610612742]
        elif teamName == "Denver Nuggets":
            return [7,1610612743]
        elif teamName == "Golden State Warriors":
            return [9,1610612744]
        elif teamName == "Houston Rockets":
            return [10,1610612745]
        elif teamName == "Los Angeles Clippers":
            return [12,1610612746]
        elif teamName == "Los Angeles Lakers":
            return [13,1610612747]
        elif teamName == "Miami Heat":
            return [15,1610612748]
        elif teamName == "Milwaukee Bucks":
            return [16,1610612749]
        elif teamName ==  "Minnesota Timberwolves":
            return [17,1610612750]
        elif teamName ==  "Brooklyn Nets":
            return [2,1610612751]
        elif teamName ==  "New York Knicks":
            return [19,1610612752]
        elif teamName ==  "Orlando Magic":
            return [21,1610612753]
        elif teamName ==  "Indiana Pacers":
            return [11,1610612754]
        elif teamName ==  "Philadelphia 76ers":
            return [22,1610612755]
        elif teamName ==  "Phoenix Suns":
            return [23,1610612756]
        elif teamName ==  "Portland Trail Blazers":
            return [24,1610612757]
        elif teamName ==  "Sacramento Kings":
            return [25,1610612758]
        elif teamName ==  "San Antonio Spurs":
            return [26,1610612759]
        elif teamName ==  "Oklahoma City Thunder":
            return [20,1610612760]
        elif teamName ==  "Toronto Raptors":
            return [27,1610612761]
        elif teamName ==  "Utah Jazz":
            return [28,1610612762]
        elif teamName ==  "Memphis Grizzlies":
            return [14,1610612763]
        elif teamName ==  "Washington Wizards":
            return [29,1610612764]
        elif teamName ==  "Detroit Pistons":
            return [8,1610612765]
        elif teamName == "Charlotte Hornets":
            return [3,1610612766]


