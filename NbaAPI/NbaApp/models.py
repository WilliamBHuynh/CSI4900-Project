from django.db import models


class Games(models.Model):
    GameId = models.AutoField(primary_key=True)
    HomeTeamName = models.CharField(max_length=100)
    VisitTeamName = models.CharField(max_length=100)
    HomeTeamPts = models.IntegerField(default=0)
    VisitTeamPts = models.IntegerField(default=0)
