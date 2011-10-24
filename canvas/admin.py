from mythoughtjot.canvas.models import *
from django.contrib import admin

admin.site.register(Project, ProjectAdmin)
admin.site.register(Canvas, CanvasAdmin)
admin.site.register(Node, NodeAdmin)
admin.site.register(UserProfile, ProfileAdmin)