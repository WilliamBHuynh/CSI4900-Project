from django.conf.urls import url
from NbaApp import views

urlpatterns = [
    url(r'^game/$', views.gameApi),
    url(r'^game/([0-9]+)$', views.gameApi)
]