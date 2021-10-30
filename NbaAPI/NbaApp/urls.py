from django.conf.urls import url
from NbaApp import views

urlpatterns = [
    url(r'^game/$', views.gameApi),
<<<<<<< Updated upstream
    url(r'^game/([0-9]+)$', views.gameApi)
=======
    url(r'^game/([0-9]+)$', views.gameApi),
    url(r'^schedule/$', views.scheduleApi),
    url(r'^prediction/$', views.predictionApi)
>>>>>>> Stashed changes
]
