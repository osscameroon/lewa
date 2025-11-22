"""URL patterns to certain paths"""
from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="home"),
    path("about", views.about, name="about"),
    path("typing", views.typing, name="typing"),
    path("pronunciation", views.pronunciation, name="pronunciation"),
    path("languages", views.languages, name="languages"),
    path("languages/<language>", views.languages, name="languages"),
    path("writing-systems", views.writing_systems, name="writing-systems"),
    path(
        "writing-systems/<writing_system>",
        views.writing_systems,
        name="writing-systems",
    ),
]
