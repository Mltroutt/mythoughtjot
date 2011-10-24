from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin


class Project(models.Model):
    title = models.CharField(max_length=75)
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, blank=True, null=True, related_name="project_current_owner")
    creator = models.ForeignKey(User, blank=True, null=True, related_name = "project_original_owner")

    def __unicode__(self):
        return self.title

class Canvas(models.Model):
    title = models.CharField(max_length=75)
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, blank=True, null=True, related_name="canvas_current_owner")
    creator = models.ForeignKey(User, blank=True, null=True, related_name = "canvas_original_owner")
    public = models.BooleanField(default=True)
    allow_guests = models.BooleanField(default=True)
    project = models.ForeignKey(Project)

    def __unicode__(self):
        return unicode(self.title) + ". Created by: " + unicode(self.creator) + ". From project: " + unicode(self.project.title)

    def node_count(self):
        return self.node_set.count()

class Node(models.Model):
    data = models.TextField(max_length=10000)
    type = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, blank=True, null=True)
    canvas = models.ForeignKey(Canvas)

    def __unicode__(self):
        return "Node created by " + unicode(self.creator) + " on " + self.created.strftime("%b %d, %I:%M %p")

class UserProfile(models.Model):
    avatar = models.ImageField("Profile Pic", upload_to="images/", blank=True, null=True)
    user = models.ForeignKey(User, unique=True)

    def __unicode__(self):
        return unicode(self.user)


### Admin

class ProfileAdmin(admin.ModelAdmin):
    list_display = ["user"]

class ProjectAdmin(admin.ModelAdmin):
    pass

class CanvasAdmin(admin.ModelAdmin):
    list_display = ["title", "project", "owner", "created", "node_count"]
    list_filter = ["project", "creator", "owner"]

class NodeAdmin(admin.ModelAdmin):
    search_fields = ["canvas", "creator"]
    list_display = ["canvas", "creator", "created"]