# SPDX-FileCopyrightText: 2025 Brady Fomegne and contributors
#
# SPDX-License-Identifier: MPL-2.0

# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

from django.contrib.auth.forms import AdminUserCreationForm, UserChangeForm
from .models import CustomUser


class CustomUserCreationForm(AdminUserCreationForm):
    """User creation form, asks for both email and username"""
    class Meta:
        model = CustomUser
        fields = (
            "email",
            "username",
        )


class CustomUserChangeForm(UserChangeForm):
    """User change preferences form, asks for both email and username"""
    class Meta:
        model = CustomUser
        fields = ("email", "username")
