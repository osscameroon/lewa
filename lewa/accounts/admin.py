from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    """Admin user for Lewa"""
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = [
        "email",
        "username",
        "score",
        "is_staff",
        "is_active",
    ]

    fieldsets = UserAdmin.fieldsets + (
        ('Gamification', {'fields': ('score',)}),
    )


admin.site.register(CustomUser, CustomUserAdmin)
