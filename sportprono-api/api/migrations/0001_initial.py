import api.models
import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="Event",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("team1", models.CharField(max_length=32)),
                ("team2", models.CharField(max_length=32)),
                ("time", models.DateTimeField()),
                ("score1", models.IntegerField(blank=True, null=True)),
                ("score2", models.IntegerField(blank=True, null=True)),
                ("team1_bonus", models.BooleanField(default=False)),
                ("team2_bonus", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="CustomUser",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("password", models.CharField(max_length=128, verbose_name="password")),
                ("last_login", models.DateTimeField(blank=True, null=True, verbose_name="last login")),
                (
                    "is_superuser",
                    models.BooleanField(
                        default=False,
                        help_text="Designates that this user has all permissions without explicitly assigning them.",
                        verbose_name="superuser status",
                    ),
                ),
                (
                    "username",
                    models.CharField(
                        error_messages={"unique": "A user with that username already exists."},
                        help_text="Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.",
                        max_length=150,
                        unique=True,
                        validators=[django.contrib.auth.validators.UnicodeUsernameValidator()],
                        verbose_name="username",
                    ),
                ),
                ("first_name", models.CharField(blank=True, max_length=150, verbose_name="first name")),
                ("last_name", models.CharField(blank=True, max_length=150, verbose_name="last name")),
                (
                    "is_staff",
                    models.BooleanField(
                        default=False,
                        help_text="Designates whether the user can log into this admin site.",
                        verbose_name="staff status",
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(
                        default=True,
                        help_text=(
                            "Designates whether this user should be treated as active.",
                            "Unselect this instead of deleting accounts."
                        ),
                        verbose_name="active",
                    ),
                ),
                ("date_joined", models.DateTimeField(default=django.utils.timezone.now, verbose_name="date joined")),
                ("email", models.EmailField(max_length=254, unique=True)),
                (
                    "groups",
                    models.ManyToManyField(
                        blank=True,
                        help_text=(
                            "The groups this user belongs to.",
                            "A user will get all permissions granted to each of their groups."
                        ),
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.group",
                        verbose_name="groups",
                    ),
                ),
                (
                    "user_permissions",
                    models.ManyToManyField(
                        blank=True,
                        help_text="Specific permissions for this user.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.permission",
                        verbose_name="user permissions",
                    ),
                ),
            ],
            managers=[
                ("objects", django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name="Bet",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("score1", models.IntegerField(blank=True, null=True)),
                ("score2", models.IntegerField(blank=True, null=True)),
                ("team1_bonus", models.BooleanField(default=False)),
                ("team2_bonus", models.BooleanField(default=False)),
                ("points", models.IntegerField(blank=True, default=None, null=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="user_bet",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "event",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="bets", to="api.event"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Group",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=32)),
                ("location", models.CharField(max_length=32)),
                ("description", models.CharField(max_length=256)),
            ],
            options={
                "unique_together": {("name", "location")},
            },
        ),
        migrations.AddField(
            model_name="event",
            name="group",
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="events", to="api.group"),
        ),
        migrations.CreateModel(
            name="Member",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("admin", models.BooleanField(default=False)),
                (
                    "group",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="members", to="api.group"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="members_of",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="UserProfile",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("image", models.ImageField(blank=True, upload_to=api.models.upload_path_handler)),
                ("is_premium", models.BooleanField(default=False)),
                ("bio", models.CharField(blank=True, max_length=256, null=True)),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE, related_name="profile", to=settings.AUTH_USER_MODEL
                    ),
                ),
            ],
        ),
        migrations.AddConstraint(
            model_name="customuser",
            constraint=models.UniqueConstraint(fields=("username", "email"), name="unique_username_email"),
        ),
        migrations.AddIndex(
            model_name="bet",
            index=models.Index(fields=["user", "event"], name="api_bet_user_id_a22523_idx"),
        ),
        migrations.AlterUniqueTogether(
            name="bet",
            unique_together={("user", "event")},
        ),
        migrations.AlterUniqueTogether(
            name="event",
            unique_together={("team1", "team2", "time", "group")},
        ),
        migrations.AddIndex(
            model_name="member",
            index=models.Index(fields=["user", "group"], name="api_member_user_id_759469_idx"),
        ),
        migrations.AlterUniqueTogether(
            name="member",
            unique_together={("user", "group")},
        ),
    ]
