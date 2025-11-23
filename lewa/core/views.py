"""Django views, you can find the templates at `templates/core/`."""

from django.shortcuts import render
from .models import LewaData, Score


# Create your views here.
def index(request):
    all_systems = list(LewaData.get_writing_systems())
    return render(request, "core/index.html", {"all_systems": all_systems})


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
    # Support search via ?q=term
    q = (request.GET.get("q") or "").strip()
    data = list(LewaData.get_languages())

    if q:
        q_lower = q.lower()

        def matches(lang):
            # search common fields: name, short English, description English, country, country_code, writing systems
            name = str(lang.get("name", "")).lower()
            short = str((lang.get("short") or {}).get("en", "")).lower()
            desc = str((lang.get("description") or {}).get("en", "")).lower()
            country = str(lang.get("country", "")).lower()
            country_code = str(lang.get("country_code", "")).lower()
            writing_systems = " ".join(lang.get("writing_systems", [])).lower()

            return (
                q_lower in name
                or q_lower in short
                or q_lower in desc
                or q_lower in country
                or q_lower in country_code
                or q_lower in writing_systems
            )

        filtered = [l for l in data if matches(l)]
    else:
        filtered = data

    return render(request, "core/languages.html", {"languages": filtered, "q": q, "total": len(filtered)})


def writing_systems(request, writing_system=None):
    data = LewaData.get_writing_systems()

    return render(request, "core/writing_systems.html", {"writing_systems": data})


def leaderboard_view(request):
    scores_list = Score.objects.all()[:10]

    return render(request, "core/leaderboard.html", {"scores": scores_list})
