from django.db import models
from django.contrib.auth.models import AbstractUser

import string
import random


def upload_path_handler(instance, filename):
    return f"avatars/{instance.user.id}/{filename}"

def upload_path_group(instance, filename):
    return f"groupLogo/{instance.id}/{filename}"


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['username', 'email'], name='unique_username_email')
        ]

    def clean(self):
        if CustomUser.objects.exclude(pk=self.pk).filter(username=self.username, email=self.email).exists():
            raise ValidationError("A user with this username and email already exists.")


class Group(models.Model):
    name = models.CharField(max_length=32, null=False, unique=True)
    image = models.ImageField(upload_to=upload_path_group, blank=True)
    is_private = models.BooleanField(default=False)
    code = models.CharField(max_length=6, unique=True, editable=False, null=True, blank=True)
    searchCode = models.CharField(max_length=16, unique=True, editable=False, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
            self.searchCode = ''.join(random.choices(string.ascii_uppercase + string.digits, k=16))
        super().save(*args, **kwargs)



class Event(models.Model):
    team1 = models.CharField(max_length=32, blank=False)
    team2 = models.CharField(max_length=32, blank=False)
    time = models.DateTimeField(null=False, blank=False)
    score1 = models.IntegerField(null=True, blank=True)
    score2 = models.IntegerField(null=True, blank=True)
    group = models.ForeignKey(Group, related_name='events', on_delete=models.CASCADE)
    team1_bonus = models.BooleanField(default=False)
    team2_bonus = models.BooleanField(default=False)

    class Meta:
        unique_together = (('team1', 'team2', 'time', 'group'))


class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, related_name='profile', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=upload_path_handler, blank=True)
    is_premium = models.BooleanField(default=False)
    bio = models.CharField(max_length=256, blank=True, null=True)


class Member(models.Model):
    group = models.ForeignKey(Group, related_name='members', on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, related_name='members_of', on_delete=models.CASCADE)
    admin = models.BooleanField(default=False)

    class Meta:
        unique_together = (('user', 'group'),)
        indexes = [
            models.Index(fields=['user', 'group']),
        ]


class Bet(models.Model):
    user = models.ForeignKey(CustomUser, related_name='user_bet', on_delete=models.CASCADE)
    event = models.ForeignKey(Event, related_name='bets', on_delete=models.CASCADE)
    score1 = models.IntegerField(null=True, blank=True)
    score2 = models.IntegerField(null=True, blank=True)
    team1_bonus = models.BooleanField(default=False)
    team2_bonus = models.BooleanField(default=False)
    points = models.IntegerField(default=None, null=True, blank=True)

    class Meta:
        unique_together = (('user', 'event'),)
        indexes = [
            models.Index(fields=['user', 'event']),
        ]
