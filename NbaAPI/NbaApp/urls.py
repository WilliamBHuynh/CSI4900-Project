from django.conf.urls import url
from django.urls import path
from NbaApp import views

urlpatterns = [
    url(r'^game/$', views.gameApi),
    url(r'^game/([0-9]+)$', views.gameApi),
    url(r'^schedule/$', views.scheduleApi),
    url(r'^standing/$', views.standingApi),
    path('boxscore/<slug:date>/<str:team1>/<str:team2>/', views.boxScoreApi),
    url(r'^prediction/$', views.predictionApi)

]
