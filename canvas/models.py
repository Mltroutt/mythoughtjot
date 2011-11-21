from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin


class Project(models.Model):
    title = models.CharField(max_length=75)
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, blank=False, null=False, related_name="project_current_owner")
    creator = models.ForeignKey(User, blank=False, null=False, related_name = "project_original_owner")
    project_collaborators = models.ManyToManyField(User)

    def collaborators(self):
        return ', '.join([u.username for u in self.project_collaborators.all()])
    collaborators.short_description = "Collaborators"

    def __unicode__(self):
        return self.title

class Canvas(models.Model):
    title = models.CharField(max_length=75)
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, blank=False, null=False, related_name="canvas_current_owner")
    creator = models.ForeignKey(User, blank=False, null=False, related_name = "canvas_original_owner")
    collaborators = models.ManyToManyField(User)
    public = models.BooleanField(default=True)
    allow_guests = models.BooleanField(default=True)
    project = models.ForeignKey(Project)

    def __unicode__(self):
        return unicode(self.title) + ". Created by: " + unicode(self.creator) + ". From project: " + unicode(self.project.title)

    def node_count(self):
        return self.node_set.count()

    def user_names(self):
        return ', '.join([u.username for u in self.collaborators.all()])
    node_count.short_description = "# Nodes"
    user_names.short_description = "Collaborators"

    class Meta:
        verbose_name_plural = ('canvases')


class Node(models.Model):
    data = models.TextField(max_length=10000)
    type = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, blank=False, null=True)
    canvas = models.ForeignKey(Canvas)

    def __unicode__(self):
        return "Node created by " + unicode(self.creator) + " on " + self.created.strftime("%b %d, %I:%M %p")

class UserProfile(models.Model):
    #avatar = models.ImageField("Profile Pic", upload_to="images/", blank=True, null=True)
    user = models.ForeignKey(User, unique=True)

    canvases = models.ManyToManyField(Canvas)

    def __unicode__(self):
        return unicode(self.user)


### Admin

class ProfileAdmin(admin.ModelAdmin):
    list_display = ["user"]

class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "collaborators","owner"]
    search_fields = ["title", "owner__username", "creator__username", "created"]

class CanvasAdmin(admin.ModelAdmin):
    list_display = ["title", "project", "user_names", "owner", "created", "node_count"]
    list_filter = ["project", "creator", "owner"]
    search_fields = ["title", "project__title", "owner__username", "creator__username", "collaborators__username"]

class NodeAdmin(admin.ModelAdmin):
    search_fields = ["canvas__title", "creator__username", "data"]
    list_display = ["canvas", "creator", "created"]