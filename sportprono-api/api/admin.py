from django.contrib import admin
from .models import Group, Event, UserProfile, Member, Bet

# Register your models here.
@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    fields = ('name', 'location', 'description')
    list_display = ('id', 'name', 'location', 'description')


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    fields = ('team1', 'team2', 'time', 'score1', 'score2', 'group', 'team1_bonus', 'team2_bonus')
    list_display = ('id', 'team1', 'team2', 'time', 'group')


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    fields = ('user', 'image', 'is_premium', 'bio')
    list_display = ('id', 'user', 'image', 'is_premium')

    
@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    fields = ('user', 'group', 'admin')
    list_display = ('id', 'user', 'group', 'admin')


@admin.register(Bet)
class BetAdmin(admin.ModelAdmin):
    fields = ('user', 'event', 'score1', 'score2', 'points', 'team1_bonus', 'team2_bonus')
    list_display = ('id', 'user', 'event')