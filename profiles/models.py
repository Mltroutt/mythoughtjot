from django.db import models
from django.contrib.auth.models import User

'''
class UserProfile(models.Model):
    user = models.OneToOneField(User, unique=True)
    username = models.CharField(max_length=32)

User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])
'''

