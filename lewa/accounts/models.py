# SPDX-FileCopyrightText: 2025 Brady Fomegne and contributors
#
# SPDX-License-Identifier: MPL-2.0

# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    """Custom user type; can get email by str(custom_user_instance)"""
    def __str__(self):
        return self.email or self.username
