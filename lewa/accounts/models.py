from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    """Custom user type; can get email by str(custom_user_instance)"""

    # Store the total points earned by the user. 
    score = models.IntegerField(default=0, help_text="Total XP earned by the user")

    def __str__(self):
        return self.email or self.username

    def add_points(self, amount):
        """Add points to the user's score."""
        self.score += amount
        self.save()

    def remove_points(self, amount):
        """Remove points from the user's score."""
        self.score -= amount
        self.save()

    def get_score(self):
        """Get the user's score."""
        return self.score