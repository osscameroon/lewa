from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    """Custom user type; can get email by str(custom_user_instance)"""
    def __str__(self):
        return self.email or self.username
