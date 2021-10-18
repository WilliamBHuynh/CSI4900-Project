from django.db import models


class Games(models.Model):
    GameId = models.AutoField(primary_key=True)
    HomeTeam = models.CharField(max_length=100)
    VisitorTeam = models.CharField(max_length=100)
