from django.shortcuts import get_object_or_404, render_to_response, redirect
from django.core.context_processors import csrf
from mythoughtjot.canvas.models import *
from django.contrib.auth.decorators import login_required
from django.template import RequestContext
from django.forms import ModelForm


class ProjectForm(ModelForm):
    class Meta:
        model = Project
        exclude = ["created","owner","creator","project_collaborators"]

class CanvasForm(ModelForm):
    class Meta:
        model = Canvas
        fields = ('project','title','public','allow_guests')

@login_required
def create_project(request):
    form = ProjectForm(request.POST or None)

    if request.method == 'POST':
        if form.is_valid():
            pre_save = form.save(commit=False)
            pre_save.owner = request.user
            pre_save.creator = request.user
            pre_save.save()
            pre_save.project_collaborators.add(request.user)
            return redirect('/project/')
    return render_to_response('project_creation.html', add_csrf(request, form=form), context_instance=RequestContext(request))

@login_required
def create_canvas(request):

    if request.method == 'POST':
        form = CanvasForm(request.POST)
        form.fields['project'].queryset = Project.objects.filter(owner=request.user)
        if form.is_valid():
            pre_save = form.save(commit=False)
            pre_save.owner = request.user
            pre_save.creator = request.user
            pre_save.save()
            pre_save.collaborators.add(request.user)
            return redirect('/canvas/')
    form = CanvasForm()
    form.fields['project'].queryset = Project.objects.filter(project_collaborators=request.user)
    return render_to_response('canvas_creation.html', add_csrf(request, form=form), context_instance=RequestContext(request))

@login_required
def canvas(request, pk):
    canvas = Canvas.objects.get(pk=pk)
    isCollaborator = Canvas.objects.filter(pk=pk,collaborators__username=request.user.username)
    if not isCollaborator and not canvas.public:
        return redirect('/')
    nodes = Node.objects.filter(canvas=pk)
    return render_to_response("canvas.html", add_csrf(request, pk=pk, canvas=canvas, nodes=nodes), context_instance=RequestContext(request))

def node(request, pk):
    return render_to_response("node.html", {'pk':pk})


def add_csrf(request, **kwargs):
    """Add CSRF to dictionary."""
    d = dict(user=request.user, **kwargs)
    d.update(csrf(request))
    return d