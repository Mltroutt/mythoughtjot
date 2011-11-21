from django.shortcuts import get_object_or_404, render_to_response, redirect
from django.core.context_processors import csrf
from mythoughtjot.canvas.models import *
from django.contrib.auth.decorators import login_required
from django.template import RequestContext
from django.forms import ModelForm, forms


class ProjectForm(ModelForm):
    class Meta:
        model = Project
        fields = ('title','description')
        exclude = ["created","owner","creator","project_collaborators"]
        
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(ProjectForm, self).__init__(*args, **kwargs)


class CanvasForm(ModelForm):
    class Meta:
        model = Canvas
        fields = ('project','title','public','allow_guests')
        
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(CanvasForm, self).__init__(*args, **kwargs)

    def clean_project(self):
        project = self.cleaned_data['project']
        if not Project.objects.filter(pk=project.pk,project_collaborators=self.request.user).exists():
            #seld.form.data['project'] = ''
            raise forms.ValidationError("You are not a collaborator on this project.")
        return project

# TODO: add ability to add collaborators to projects/canvas, add user submission validation to canvas

@login_required
def create_project(request=None):
    form = ProjectForm(request.POST or None, request=request)

    if request.method == 'POST' and form.is_valid():
        pre_save = form.save(commit=False)
        pre_save.owner = request.user
        pre_save.creator = request.user
        pre_save.save()
        pre_save.project_collaborators.add(request.user)
        return redirect('/project/')
    return render_to_response('forms.html', add_csrf(request, form=form, title='Create A Project'), context_instance=RequestContext(request))

@login_required
def create_canvas(request):
    form = CanvasForm(request.POST or None, request=request)
    if request.method == 'POST' and form.is_valid():
        pre_save = form.save(commit=False)
        pre_save.owner = request.user
        pre_save.creator = request.user
        pre_save.save()
        pre_save.collaborators.add(request.user)
        return redirect('/canvas/')
    form.fields['project'].queryset = Project.objects.filter(project_collaborators=request.user)
    return render_to_response('forms.html', add_csrf(request, form=form, title='Create A Canvas'), context_instance=RequestContext(request))

@login_required
def project(request, pk):
    project = get_object_or_404(Project,pk=pk)
    isCollaborator = Project.objects.filter(pk=pk,project_collaborators=request.user).exists()
    if not isCollaborator:
        return redirect('/')
    canvases = Canvas.objects.filter(project=pk)
    return render_to_response("project.html", add_csrf(request, pk=pk, project=project, canvases=canvases), context_instance=RequestContext(request))


@login_required
def canvas(request, pk):
    canvas = get_object_or_404(Canvas,pk=pk)
    isCollaborator = Canvas.objects.filter(pk=pk,collaborators=request.user).exists()
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