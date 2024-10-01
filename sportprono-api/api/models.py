from django.db import models
from django.contrib.auth.models import User


def upload_path_handler(instance, filename):
    return f"avatars/{instance.user.id}/{filename}"


class Group(models.Model):
    name = models.CharField(max_length=32, null=False, unique=False)
    location = models.CharField(max_length=32, null=False)
    description = models.CharField(max_length=256)
    
    class Meta:
        unique_together = (('name', 'location'))


class Event(models.Model):
    team1 = models.CharField(max_length=32, blank=False)
    team2 = models.CharField(max_length=32, blank=False)
    time = models.DateTimeField(null=False, blank=False)
    score1 = models.IntegerField(null=True, blank=True)
    score2 = models.IntegerField(null=True, blank=True)
    group = models.ForeignKey(Group, related_name='events', on_delete=models.CASCADE)

    class Meta:
        unique_together = (('team1', 'team2', 'time', 'group'))


class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=upload_path_handler, blank=True)
    is_premium = models.BooleanField(default=False)
    bio = models.CharField(max_length=256, blank=True, null=True)


class Member(models.Model):
    group = models.ForeignKey(Group, related_name='members', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='members_of', on_delete=models.CASCADE)
    admin = models.BooleanField(default=False)

    class Meta:
        unique_together = (('user', 'group'),)
        indexes = [
            models.Index(fields=['user', 'group']),
        ]


class Bet(models.Model):
    user = models.ForeignKey(User, related_name='user_bet', on_delete=models.CASCADE)
    event = models.ForeignKey(Event, related_name='bets', on_delete=models.CASCADE)
    score1 = models.IntegerField(null=True, blank=True)
    score2 = models.IntegerField(null=True, blank=True)
    points = models.IntegerField(default=None, null=True, blank=True)

    class Meta:
        unique_together = (('user', 'event'),)
        indexes = [
            models.Index(fields=['user', 'event']),
        ]
