from django.db import models


class Group(models.Model):
    name = models.CharField(max_length=32, null=False, unique=False)
    location = models.CharField(max_length=32, null=False)
    description = models.CharField(max_length=256)
    
    class Meta:
        unique_together = (('name', 'location'))