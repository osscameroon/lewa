# SPDX-FileCopyrightText: 2025 Brady Fomegne and contributors
#
# SPDX-License-Identifier: MPL-2.0

# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

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
    path("leaderboard", views.leaderboard_view, name="leaderboard"),
]
