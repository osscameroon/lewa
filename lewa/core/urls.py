from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="home"),
    path("about", views.about, name="about"),
    path("typing", views.typing, name="typing"),
    path("pronunciation", views.pronunciation, name="pronunciation"),
    path("languages", views.languages, name="languages"),
]
