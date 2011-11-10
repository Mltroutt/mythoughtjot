from django.shortcuts import get_object_or_404, render_to_response, redirect
from django.core.context_processors import csrf
from mythoughtjot.settings import MEDIA_ROOT, MEDIA_URL
from mythoughtjot.canvas.models import *
from django.contrib.auth.decorators import login_required

@login_required
def canvas(request, pk):
    canvas = Canvas.objects.get(pk=pk)
    isCollaborator = Canvas.objects.filter(pk=pk,collaborators__username=request.user.username)
    if not isCollaborator:
        return redirect('/')
    nodes = Node.objects.filter(canvas=pk)
    return render_to_response("canvas.html", add_csrf(request, pk=pk, canvas=canvas, nodes=nodes, media_url=MEDIA_URL))

def node(request, pk):
    return render_to_response("node.html", {'pk':pk})


def add_csrf(request, **kwargs):
    """Add CSRF to dictionary."""
    d = dict(user=request.user, **kwargs)
    d.update(csrf(request))
    return d
