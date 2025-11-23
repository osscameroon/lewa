"""Language/writing system data"""
from django.db import models
from django.conf import settings
import pathlib
import tomllib


# Create your models here.
class LewaData:
    @classmethod
    def get_languages(cls):
        """Gets languages. Yields the "info" section of tomllib parsed data."""
        data_dir = pathlib.Path(settings.LEWA_DATA_DIR / "languages")

        for lang_file in data_dir.iterdir():
            if (
                not lang_file.is_file()
                or lang_file.stem.startswith(".")
                or lang_file.suffix != ".toml"
            ):
                continue

            with open(lang_file, "rb") as f:
                data = tomllib.load(f)

            yield data["info"]

    @classmethod
    def get_writing_systems(cls):
        """Gets writing systems. Yields tomllib parsed data."""
        data_dir = pathlib.Path(settings.LEWA_DATA_DIR / "writing_systems")

        for im_file in data_dir.iterdir():
            if (
                not im_file.is_file()
                or im_file.stem.startswith(".")
                or im_file.suffix != ".toml"
            ):
                continue

            with open(im_file, "rb") as f:
                data = tomllib.load(f)


            yield data["info"]

class Score(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    points = models.IntegerField()
    speed = models.IntegerField()
    accuracy = models.DecimalField(max_digits=4, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-points']

    def __str__(self):
        return f"{self.user.username} - {self.points}"
    
    def accuracy_percent(self):
        return int(self.accuracy * 100)
