from django.db import models


class Games(models.Model):
    GameId = models.AutoField(primary_key=True)
    Date = models.DateField()
    HomeTeamName = models.CharField(max_length=100)
    AwayTeamName = models.CharField(max_length=100)
    HomeTeamPts = models.IntegerField(default=0)
    AwayTeamPts = models.IntegerField(default=0)
