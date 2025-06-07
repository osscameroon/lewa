from django.shortcuts import render
from .models import LewaData


# Create your views here.
def index(request):
    return render(
        request,
        "core/index.html",
    )


def about(request):
    return render(
        request,
        "core/about.html",
    )


def typing(request):
    return render(request, "core/typing.html")


def pronunciation(request):
    return render(request, "core/pronunciation.html")


def languages(request, language=None):
    data = LewaData.get_languages()

    return render(request, "core/languages.html", {"languages": data})


def writing_systems(request, writing_system=None):
    data = LewaData.get_writing_systems()

    return render(request, "core/writing_systems.html", {"writing_systems": data})
