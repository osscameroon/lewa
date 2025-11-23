"""Django views, you can find the templates at `templates/core/`."""
from django.shortcuts import render
from .models import LewaData, Score


# Create your views here.
def index(request):
    all_systems = list(LewaData.get_writing_systems())
    return render(
        request,
        "core/index.html", 
        {"all_systems": all_systems}
    )


def about(request):
    return render(
        request,
        "core/about.html",
    )


def typing(request, writing_system_code=None):
    all_systems = list(LewaData.get_writing_systems())

    if writing_system_code:
        current_system = next(
            (
                writing_system
                for writing_system in all_systems
                if writing_system["name"] == writing_system_code
            )
        )
    else:
        current_system = all_systems[0] if all_systems else None
    return render(request, "core/typing.html", {"writing_system": current_system})


def pronunciation(request):
    return render(request, "core/pronunciation.html")


def languages(request, language=None):
    data = LewaData.get_languages()

    return render(request, "core/languages.html", {"languages": data})


def writing_systems(request, writing_system=None):
    data = LewaData.get_writing_systems()

    return render(request, "core/writing_systems.html", {"writing_systems": data})

def leaderboard_view(request):
    scores_list = Score.objects.all()[:10]

    return render(request, 'core/leaderboard.html', {'scores': scores_list})
