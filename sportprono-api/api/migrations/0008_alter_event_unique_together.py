# Generated by Django 5.1 on 2024-10-02 07:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_bet'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='event',
            unique_together={('team1', 'team2', 'time', 'group')},
        ),
    ]