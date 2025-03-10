import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="group",
            unique_together=set(),
        ),
        migrations.AddField(
            model_name="group",
            name="code",
            field=models.CharField(blank=True, editable=False, max_length=6, null=True, unique=True),
        ),
        migrations.AddField(
            model_name="group",
            name="image",
            field=models.ImageField(blank=True, upload_to=api.models.upload_path_group),
        ),
        migrations.AlterField(
            model_name="group",
            name="name",
            field=models.CharField(max_length=32, unique=True),
        ),
        migrations.RemoveField(
            model_name="group",
            name="description",
        ),
        migrations.RemoveField(
            model_name="group",
            name="location",
        ),
    ]
