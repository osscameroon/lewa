from django.shortcuts import render


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


def languages(request):
    return render(request, "core/languages.html")
