# Generated by Django 5.1 on 2024-10-29 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_group_unique_together_group_code_group_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='searchCode',
            field=models.CharField(blank=True, editable=False, max_length=16, null=True, unique=True),
        ),
    ]
