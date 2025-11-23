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
