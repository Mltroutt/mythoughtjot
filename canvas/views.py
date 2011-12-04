from django.shortcuts import get_object_or_404, render_to_response, redirect
from django.core.context_processors import csrf
from mythoughtjot.canvas.models import *
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.template import RequestContext, Context
from django.forms import ModelForm
from django import forms
from django.utils import simplejson
from django.http import HttpResponse, Http404
from django.template.loader import render_to_string
from django.db.models import Q

class ProjectForm(ModelForm):
    class Meta:
        model = Project
        fields = ('title','description')
        exclude = ["created","owner","creator","project_collaborators"]
        
    class Media:
        js = (
              "/media/js/forms/project.js",
              )
        
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(ProjectForm, self).__init__(*args, **kwargs)


class CanvasForm(ModelForm):
    class Meta:
        model = Canvas
        fields = ('project','title','public','allow_guests')
        
    class Media:
        js = (
              "/media/js/forms/canvas.js",
              )
        
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(CanvasForm, self).__init__(*args, **kwargs)

    def clean_project(self):
        project = self.cleaned_data['project']
        if not Project.objects.filter(pk=project.pk,project_collaborators=self.request.user).exists():
            raise forms.ValidationError("You are not a collaborator on this project.")
        return project

class CanvasEditForm(ModelForm):
    class Meta:
        model = Canvas
        exclude = {'creator','created','owner'}

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        self.collaborators = kwargs.pop('collaborators', None)
        self.project_collaborator = kwargs.pop('project_collaborator', None)
        self.project_collaborators = kwargs.pop('project_collaborators', None)
        super(CanvasEditForm, self).__init__(*args, **kwargs)
        self.fields['project'] = forms.ModelChoiceField(self.project_collaborator)
        self.fields['owner'] = forms.ModelChoiceField(self.project_collaborators)
        self.fields['collaborators'] = forms.ModelMultipleChoiceField(self.collaborators)

class ProjectEditForm(ModelForm):
    class Meta:
        model = Project
        exclude = {'creator','created'}

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        self.project_collaborators = kwargs.pop('project_collaborators', None)
        super(ProjectEditForm, self).__init__(*args, **kwargs)
        self.fields['owner'] = forms.ModelChoiceField(self.project_collaborators)
        self.fields['project_collaborators'] = forms.ModelMultipleChoiceField(self.project_collaborators)

class CollaboratorForm(forms.Form):
    user = forms.CharField(label="Username",max_length=100)
    canvas = forms.IntegerField(widget=forms.HiddenInput)
    
    class Media:
        js = (
              "/media/js/forms/collaborators.js",
              )
    def clean_user(self):
        user = self.cleaned_data['user']
        canvas = self.canvas
        try:
            user_obj = User.objects.get(username__exact=user)
        except:
            raise forms.ValidationError("This user does not exist.")
        if not Canvas.objects.filter(pk=canvas,collaborators=self.request.user).exists():
            raise forms.ValidationError("You don't have permission to do that.")
        if Canvas.objects.filter(pk=canvas,collaborators=user_obj).exists(): #Doesn't raise error if user is collaborator -- fix
            raise forms.ValidationError("User is already a collaborator on this canvas.")
        return user
    
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('canvas', None)
        self.request = kwargs.pop('request', None)
        super(CollaboratorForm, self).__init__(*args, **kwargs)
    

@login_required
def create_project(request=None):
    form = ProjectForm(request.POST or None, request=request)

    if request.method == 'POST':
        if request.is_ajax():
            return_message = {'success':False, 'messages':'', 'errors':{}}
            if form.is_valid():
                try:
                    pre_save = form.save(commit=False)
                    pre_save.owner = request.user
                    pre_save.creator = request.user
                    pre_save.save()
                    pre_save.project_collaborators.add(request.user)
                    
                    return_message['success'] = True
            
                    return_message['messages'] = "Successfully added your project"
                    
                    id = pre_save.pk
                    return redirect('/project/'+str(id))
                    
                except:
                    return_message['success'] = True
            
                    return_message['messages'] = "Failed to add the project"
                finally:
                    json = simplejson.dumps(return_message)
                    
                    return HttpResponse(json, mimetype='application/json')
            else:
                d={}
                for e in form.errors.iteritems():
                    d.update({e[0]:unicode(e[1])}) # e[0] is the id, unicode(e[1]) is the error HTML.
                return_message['errors'] = d
        
                json = simplejson.dumps(return_message)
        
                return HttpResponse(json, mimetype='application/json')
        else:
            if form.is_valid():  
                pre_save = form.save(commit=False)
                pre_save.owner = request.user
                pre_save.creator = request.user
                pre_save.save()
                pre_save.project_collaborators.add(request.user)
                id = pre_save.pk
                return redirect('/project/'+str(id))
    return render_to_response('forms.html', add_csrf(request, form=form, title='Create A Project'), context_instance=RequestContext(request))

@login_required
def project_delete(request, pk):
    project = get_object_or_404(Project, pk=pk)
    canvases = Canvas.objects.filter(project=project)

    if request.is_ajax() and request.user == project.owner:
        try:
            project.delete()
            for canvas in canvases:
                canvas.delete()
            return HttpResponse("true", mimetype='application/json')
        except:
            return HttpResponse("false", mimetype='application/json')

    raise Http404

@login_required
def project_edit(request, pk):

    project = get_object_or_404(Project, pk=pk)
    project_collaborators = project.project_collaborators.all()

    form = ProjectEditForm(request.POST or None,
                          project_collaborators=project_collaborators,
                          request=request, instance=project)

    if request.POST and form.is_valid():
        pre_save = form.save(commit=False)
        pre_save.owner = form.cleaned_data['owner']
        pre_save.creator = project.creator
        pre_save.created = project.created
        pre_save.save()
        return redirect('/project/myprojects/')


    return render_to_response('forms.html', add_csrf(request, form=form, title='Edit Project'), context_instance=RequestContext(request))

@login_required
def myprojects(request):
    
    projects = Project.objects.select_related().filter(Q(project_collaborators=request.user) | Q(canvas__collaborators=request.user)).distinct()

    return render_to_response('my_projects.html', {'projects':projects}, context_instance=RequestContext(request))

@login_required
def create_canvas_modal(request):
    form = CanvasForm(request.POST or None, request=request)
    
    if request.method == 'POST' and request.is_ajax():
        return_message = {'success':False, 'messages':'', 'errors':{}}
        
        if form.is_valid():
            try:
                pre_save = form.save(commit=False)
                pre_save.owner = request.user
                pre_save.creator = request.user
                pre_save.save()
                pre_save.collaborators.add(request.user)
                
                id = pre_save.pk
                
                return_message['success'] = True
        
                return_message['messages'] = "Successfully added your canvas"
                
                return_message['redirect'] = '/canvas/'+str(id)
                
            except:
                return_message['success'] = True
        
                return_message['messages'] = "Failed to add the canvas"
            finally:
                json = simplejson.dumps(return_message)
                
                return HttpResponse(json, mimetype='application/json')
        else:
            d={}
            for e in form.errors.iteritems():
                d.update({e[0]:unicode(e[1])}) # e[0] is the id, unicode(e[1]) is the error HTML.
            return_message['errors'] = d
    
            json = simplejson.dumps(return_message)
    
            return HttpResponse(json, mimetype='application/json')
    form.fields['project'].queryset = Project.objects.filter(project_collaborators=request.user)
    return render_to_response('canvas_create_short_form.html', add_csrf(request, form=form, title='Create A Canvas'), context_instance=RequestContext(request))

@login_required
def create_canvas(request):
    form = CanvasForm(request.POST or None, request=request)
    if request.POST:
        if request.is_ajax():
            return_message = {'success':False, 'messages':'', 'errors':{}}
            
            if form.is_valid():
                try:
                    pre_save = form.save(commit=False)
                    pre_save.owner = request.user
                    pre_save.creator = request.user
                    pre_save.save()
                    pre_save.collaborators.add(request.user)
                    
                    id = pre_save.pk
                    
                    return_message['success'] = True
            
                    return_message['messages'] = "Successfully added your canvas"
                    return redirect('/canvas/'+str(id))
                except:
                    return_message['success'] = True
            
                    return_message['messages'] = "Failed to add the canvas"
                finally:
                    json = simplejson.dumps(return_message)
                    
                    return HttpResponse(json, mimetype='application/json')
            else:
                d={}
                for e in form.errors.iteritems():
                    d.update({e[0]:unicode(e[1])}) # e[0] is the id, unicode(e[1]) is the error HTML.
                return_message['errors'] = d
        
                json = simplejson.dumps(return_message)
        
                return HttpResponse(json, mimetype='application/json')
        else:
            if form.is_valid():
                pre_save = form.save(commit=False)
                pre_save.owner = request.user
                pre_save.creator = request.user
                pre_save.save()
                pre_save.collaborators.add(request.user)
                id = pre_save.pk
                return redirect('/canvas/'+str(id))
    form.fields['project'].queryset = Project.objects.filter(project_collaborators=request.user)
    return render_to_response('forms.html', add_csrf(request, form=form, title='Create A Canvas'), context_instance=RequestContext(request))

@login_required
def canvas_delete(request, pk):
    canvas = Canvas.objects.get(pk=pk)

    if request.is_ajax() and request.user == canvas.owner:
        try:
            canvas.delete()
            return HttpResponse("true", mimetype='application/json')
        except:
            return HttpResponse("false", mimetype='application/json')

    raise Http404

@login_required
def canvas_edit(request, pk):
    canvas = get_object_or_404(Canvas, pk=pk)

    collaborators = canvas.collaborators.all()

    project = canvas.project
    project_collaborators = project.project_collaborators.all()
    project_collaborator = Project.objects.filter(project_collaborators=request.user)

    form = CanvasEditForm(request.POST or None,
                          collaborators=collaborators, project_collaborator=project_collaborator,
                          project_collaborators=project_collaborators,
                          initial={'title':canvas.title, 'owner':canvas.owner.pk, 'collaborators':collaborators, 'project':project}, request=request, instance=canvas)

    if request.POST and form.is_valid():
        pre_save = form.save(commit=False)
        pre_save.owner = form.cleaned_data['owner']
        pre_save.creator = canvas.creator
        pre_save.created = canvas.created
        pre_save.save()
        return redirect('/project/myprojects/')


    return render_to_response('forms.html', add_csrf(request, form=form, title='Edit Canvas'), context_instance=RequestContext(request))

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
        raise Http404
    nodes = Node.objects.filter(canvas=pk)
    return render_to_response("canvas.html", add_csrf(request, pk=pk, canvas=canvas, nodes=nodes), context_instance=RequestContext(request))

@login_required
def canvas_add_collaborator(request, pk):
    isCollaborator = Canvas.objects.filter(pk=pk,collaborators=request.user).exists()
    if isCollaborator:
        form = CollaboratorForm(request.POST or None, request=request, initial={'canvas' : pk})

        if request.POST:            
            if request.is_ajax():
                return_message = {'success':False, 'messages':'', 'errors':{}}
                form.canvas = pk
                if form.is_valid():
                    try:
                        
                        try:
                            canvas = Canvas.objects.get(pk=pk)
                        except:
                            print "Failed to load canvas"
                            raise
                        
                        try:
                            user_name = form.cleaned_data['user']
                            user = User.objects.get(username__exact=user_name)
                        except:
                            print "Failed to load user"
                            raise
                        
                        try:
                            canvas.collaborators.add(user)
                        except:
                            print "Failed to add user to canvas"
                            raise
                        
                        return_message['success'] = True
                
                        return_message['messages'] = "Successfully added user to this canvas"

                        
                    except:
                        return_message['success'] = True
                
                        return_message['messages'] = "Failed to add user to this canvas"
                    finally:
                        json = simplejson.dumps(return_message)
                        
                        return HttpResponse(json, mimetype='application/json')
                else:
                    d={}
                    for e in form.errors.iteritems():
                        d.update({e[0]:unicode(e[1])}) # e[0] is the id, unicode(e[1]) is the error HTML.
                    return_message['errors'] = d
            
                    json = simplejson.dumps(return_message)
            
                    return HttpResponse(json, mimetype='application/json')
            else:
                raise Http404
        return render_to_response('add_collaborator_short_form.html', add_csrf(request, canvas=pk, form=form, title='Add a collaborator'), context_instance=RequestContext(request))
    else:
        raise Http404

#TODO: Add javascript for this

@login_required
def canvas_remove_collaborator(request, pk):
    if not Canvas.objects.filter(pk=pk,creator=request.user).exists():
        raise Http404
    
    if not request.POST or request.is_ajax():
        raise Http404
    
    return_message = {'success':False, 'message':'', 'error':''}
    try:
        try:
            
            user = User.objects.get(pk=user_id)
        except:
            
            return_message['error'] = "User not found"
            raise
        
        try:
            canvas = Canvas.objects.get(pk=pk,creator=request.user,collaborators=user)
        except:
            return_message['error'] = "User is not a collaborator"
            raise
        
        try:
            canvas.collaborators.remove(user)
            return_message['message'] = "User is no longer a collaborator"
        except:
            return_message['error'] = "User not removed"
            raise
    
    except:
        return_message['success'] = False

        return_message['message'] = "Failed to rmove user from canvas"
    finally:
        json = simplejson.dumps(return_message)
        
        return HttpResponse(json, mimetype='application/json')

def node(request, pk):
    return render_to_response("node.html", {'pk':pk})


def add_csrf(request, **kwargs):
    """Add CSRF to dictionary."""
    d = dict(user=request.user, **kwargs)
    d.update(csrf(request))
    return d