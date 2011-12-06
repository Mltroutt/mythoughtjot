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
from django.db import connection
from postman.models import Message

class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ('username','first_name','last_name','email')
        exclude = ["password","is_staff", "is_active","is_superuser"]
        
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(UserForm, self).__init__(*args,**kwargs)
        
class UserProfileForm(ModelForm):
    class Meta:
        model = UserProfile
        exclude = ["user"]
        
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(UserProfileForm, self).__init__(*args,**kwargs)

class ProjectForm(ModelForm):

    """
    Form for creating a project. Takes in a name and description from the form, then assigns
    the owner, creator, created date, and collaborators automagically
    """
    
    class Meta:
        model = Project
        fields = ('title','description')
        exclude = ["created","owner","creator","project_collaborators"]
        
    class Media:
        js = (
              "/media/js/forms/project.js",
              )

    def __init__(self, *args, **kwargs):
        #get the request so we can use it later
        self.request = kwargs.pop('request', None)
        super(ProjectForm, self).__init__(*args, **kwargs)


class ProjectEditForm(ModelForm):

    """
    Edit the project. Change title, description, owner, collaborators
    """

    class Meta:
        model = Project
        exclude = {'creator','created'}

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        #Get only the collaborators of the project. The default adds all available
        #users, which is bad.
        self.project_collaborators = kwargs.pop('project_collaborators', None)
        super(ProjectEditForm, self).__init__(*args, **kwargs)
        self.fields['owner'] = forms.ModelChoiceField(self.project_collaborators)
        self.fields['project_collaborators'] = forms.ModelMultipleChoiceField(self.project_collaborators)


class CanvasForm(ModelForm):

    """
    Form for creating a canvas. Takes in a canvas name, project, and a few tick boxes as options.
    Assigns owner, creator, collaborators automagically
    """

    class Meta:
        model = Canvas
        fields = ('project','title','public','allow_guests')
        
    class Media:
        js = (
              "/media/js/forms/canvas.js",
              )
        
    def __init__(self, *args, **kwargs):
        #get the request so we can use it later
        self.request = kwargs.pop('request', None)
        super(CanvasForm, self).__init__(*args, **kwargs)

    #Check to make sure the user is a collaborator of the project they selected
    def clean_project(self):
        project = self.cleaned_data['project']
        if not Project.objects.filter(pk=project.pk,project_collaborators=self.request.user).exists():
            raise forms.ValidationError("You are not a collaborator on this project.")
        return project


class CanvasEditForm(ModelForm):

    """
    Edit a canvas. Change the title, options, collaborators and project.
    """

    class Meta:
        model = Canvas
        exclude = {'creator','created'}

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        #The canvas collaborators
        self.collaborators = kwargs.pop('collaborators', None)
        #projects which the user is a collaborator on
        self.project_collaborator = kwargs.pop('project_collaborator', None)
        #All colaborators on the current project
        self.project_collaborators = kwargs.pop('project_collaborators', None)
        super(CanvasEditForm, self).__init__(*args, **kwargs)
        self.fields['canvas'] = forms.IntegerField(widget=forms.HiddenInput)
        self.fields['project'].queryset = self.project_collaborator
        self.fields['owner'].queryset = self.project_collaborators
        self.fields['collaborators'].queryset = self.collaborators


class CollaboratorForm(forms.Form):

    """
    Forn to add collaborators to a project
    """

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
        #self.request = kwargs.pop('canvas', None)
        self.request = kwargs.pop('request', None)
        super(CollaboratorForm, self).__init__(*args, **kwargs)
    
class UserEditForm(ModelForm):
    class meta:
        model = User

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(UserEditForm, self).__init__(*args, **kwargs)

def index(request):
    
    if request.user.is_authenticated():
        return redirect('/project/myprojects/')
    else:
        return redirect('/login/')

@login_required
def update_profile(request):
    success = False
    display_user = request.user
    profile = UserProfile.objects.get_or_create(user=display_user)
    
    if request.POST:
        uform = UserForm(data = request.POST,  instance=request.user)
        pform = UserProfileForm(data = request.POST,instance = display_user.get_profile())
        if uform.is_valid() and pform.is_valid():
            user = uform.save(commit = False)
            profile = pform.save(commit = False)
            
            profile.save()
            user.save()
            success = True
    else:
        uform = UserForm(instance = display_user)
        pform = UserProfileForm(instance = display_user.get_profile())

    return render_to_response('update_forms.html', add_csrf(request, uform=uform, pform=pform, title='Update User Profile'), context_instance=RequestContext(request))


@login_required
def create_project(request=None):

    """
    Project creation form
    """

    #request.POST or None allows you to use one line for both the
    #pre-POST form and the post-POST form
    form = ProjectForm(request.POST or None, request=request)

    if request.POST:
        if request.is_ajax():
            return_message = {'success':False, 'messages':'', 'errors':{}}
            if form.is_valid():
                try:
                    #Prep the form to be saved but don't save it
                    pre_save = form.save(commit=False)

                    #Add the user as both the owner and creator
                    pre_save.owner = request.user
                    pre_save.creator = request.user
                    #Now save the form
                    pre_save.save()
                    #then add the user as the first collaborator
                    pre_save.project_collaborators.add(request.user)
                    
                    return_message['success'] = True
            
                    return_message['messages'] = "Successfully added your project"
                    
                    #Get the id of the poject that was just saved
                    id = pre_save.pk

                    #and redirect to it
                    return_message['redirect'] = '/canvas/create/'

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
                 #Prep the form to be saved but don't save it
                pre_save = form.save(commit=False)

                #Add the user as both the owner and creator
                pre_save.owner = request.user
                pre_save.creator = request.user
                #Now save the form
                pre_save.save()
                #then add the user as the first collaborator
                pre_save.project_collaborators.add(request.user)

                #Get the id of the poject that was just saved
                id = pre_save.pk

                #and redirect to it
                return redirect('/canvas/create/')
            
    return render_to_response('forms.html', add_csrf(request, form=form, title='Create A Project'), context_instance=RequestContext(request))



@login_required
def project_delete(request, pk):
    """
    Delete a project
    """

    #if the project ID was not found the go to 404
    project = get_object_or_404(Project, pk=pk)
    canvases = Canvas.objects.filter(project=project)

    if request.is_ajax() and request.user == project.owner:
        try:
            #delete the project and then all of the canvases associated with it
            project.delete()
            for canvas in canvases:
                canvas.delete()
            return HttpResponse("true", mimetype='application/json')
        except:
            return HttpResponse("false", mimetype='application/json')

    raise Http404


@login_required
def project_edit(request, pk):
    """
    Edit the project
    """

    #if the project id is not found then 404
    project = get_object_or_404(Project, pk=pk)
    project_collaborators = project.project_collaborators.all()

    #Get the project with the fields filled in via the instance parameter
    form = ProjectEditForm(request.POST or None,
                          project_collaborators=project_collaborators,
                          request=request, instance=project)

    if request.POST and form.is_valid():
        #prep the form for submission
        pre_save = form.save(commit=False)
        #add the new owner (if it's changed)
        pre_save.owner = form.cleaned_data['owner']
        #save the project creator and the created date
        pre_save.creator = project.creator
        pre_save.created = project.created
        pre_save.save()
        return redirect('/project/myprojects/')


    return render_to_response('forms.html', add_csrf(request, form=form, title='Edit Project'), context_instance=RequestContext(request))



@login_required
def myprojects(request):
    """
    List all the projects the user is associated wtih
    """

    #The Q allows you to make more complex queries. Here I use it to add a 'or' clause

    projects = Project.objects.select_related().filter(Q(project_collaborators=request.user) | Q(canvas__collaborators=request.user)).distinct()

    return render_to_response('my_projects.html', {'projects':projects}, context_instance=RequestContext(request))



@login_required
def create_canvas_modal(request):
    """
    Create canvas in a modal box (JQuery)
    """
    form = CanvasForm(request.POST or None, request=request)
    
    if request.POST and request.is_ajax():
        return_message = {'success':False, 'messages':'', 'errors':{}}
        
        if form.is_valid():
            try:
                #Prep the form for saving
                pre_save = form.save(commit=False)
                #add the user as the owner and creator
                pre_save.owner = request.user
                pre_save.creator = request.user
                pre_save.save()
                #add the user as the first collaborator
                pre_save.collaborators.add(request.user)

                #Get the canvas ID
                id = pre_save.pk
                
                return_message['success'] = True
        
                return_message['messages'] = "Successfully added your canvas"
                
                return_message['redirect'] = '/canvas/'+str(id)
                
            except:
                #Even though it wasn't successful, set to true so it just prints a message
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
    #fill in the projects field with all projects the user is associated with
    form.fields['project'].queryset = Project.objects.filter(project_collaborators=request.user)
    return render_to_response('canvas_create_short_form.html', add_csrf(request, form=form, title='Create A Canvas'), context_instance=RequestContext(request))



@login_required
def create_canvas(request):
    """
    Create a canvas the old fashioned way. This one isn't as cool.
    """
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

    """
    I'm not sure that this does.
    """
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
    """
        This kind of needs to be rewritten....
    """
    canvas = get_object_or_404(Canvas, pk=pk)

    if request.user != canvas.owner:
        raise Http404

    collaborators = canvas.collaborators.all()

    project = canvas.project
    project_collaborators = project.project_collaborators.all()
    project_collaborator = Project.objects.filter(project_collaborators=request.user)

    form = CanvasEditForm(request.POST or None,
                          collaborators=collaborators, project_collaborator=project_collaborator,
                          project_collaborators=project_collaborators,
                          initial={'owner':canvas.owner.pk, 'collaborators':collaborators, 'project':project, 'canvas':pk}, request=request, instance=canvas)

    if request.POST and form.is_valid():
        pre_save = form.save(commit=False)
        pre_save.owner = form.cleaned_data['owner']
        pre_save.creator = canvas.creator
        pre_save.created = canvas.created
        pre_save.save()
        return redirect('/project/myprojects/')


    return render_to_response('forms.html', add_csrf(request, form=form, title='Edit Canvas'), context_instance=RequestContext(request))

   #These next two def's suck. Don't use them,

@login_required
def canvas_edit_modal(request, pk):
    """
        This kind of needs to be rewritten....
    """
    canvas = get_object_or_404(Canvas, pk=pk)

    if request.user != canvas.owner:
        raise Http404

    collaborators = canvas.collaborators.all()

    project = canvas.project
    project_collaborators = project.project_collaborators.all()
    project_collaborator = Project.objects.filter(project_collaborators=request.user)

    form = CanvasEditForm(request.POST or None,
                          collaborators=collaborators, project_collaborator=project_collaborator,
                          project_collaborators=project_collaborators,
                          initial={'title':canvas.title, 'owner':canvas.owner.pk, 'project':project, 'canvas':pk}, request=request, instance=canvas)

    if request.POST and request.is_ajax():
        return_message = {'success':False, 'messages':'', 'errors':{}}
        if form.is_valid():
            try:
                save = form.save()
                print connection.queries
                if form.cleaned_data['owner'] not in canvas.collaborators.all():
                    save.collaborators.add(form.cleaned_data['owner'])
                #pre_save = form.save(commit=False)
                #pre_save.owner = form.cleaned_data['owner']
                #pre_save.creator = canvas.creator
                #pre_save.created = canvas.created
                #pre_save.save()
                #pre_save.collaborators.clear()
                #for collab in form.cleaned_data['collaborator_list']:
                #    print collab
                #pre_save.collaborators.add(form.cleaned_data['collaborators'])
                return_message['success'] = True
                return_message['messages'] = "Successfully edited your canvas"
                
            except Exception,e:
                print e
                return_message['success'] = True
                
                return_message['messages'] = "Failed to edit the canvas"
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

    #form.fields['owner'].queryset = User.objects.filter(pk=project__project_collaborators,pk=canvas__collaborators)
    return render_to_response('canvas_edit_modal.html', add_csrf(request, pk=pk, form=form, title='Edit Canvas'), context_instance=RequestContext(request))

   #These next two def's suck. Don't use them,

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
    #return the first 3 projects for the user
    projects = Project.objects.filter(project_collaborators=request.user)[:3]
    return render_to_response("canvas.html", add_csrf(request, pk=pk, projects=projects, canvas=canvas, nodes=nodes), context_instance=RequestContext(request))

    #End sucky def's


@login_required
def canvas_add_collaborator(request, pk):

    """
    Needs more collaborators.
    """

    isCollaborator = Canvas.objects.filter(pk=pk,collaborators=request.user).exists()
    if isCollaborator:
        form = CollaboratorForm(request.POST or None, request=request, initial={'canvas' : pk})

        if request.POST:            
            if request.is_ajax():
                return_message = {'success':False, 'messages':'', 'errors':{}, 'collaborators':{}}
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

                        users = []
                        
                        for collaborator in canvas.collaborators.all():
                            print collaborator.username
                            users.append({'name':collaborator.username,'id':collaborator.pk})
                        
                        return_message['collaborators'] = users
                        
                    except Exception, e:
                        return_message['success'] = True
                
                        return_message['messages'] = "Failed to add user to this canvas" + e
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
def canvas_remove_collaborator(request, pk, user):

    """
    This removes collaborators from a canvas. Currently requires imagination.
    """

    if not Canvas.objects.filter(pk=pk,creator=request.user).exists():
        raise Http404
    
    if not request.is_ajax():
        raise Http404

    return_message = {'success':False, 'message':'', 'error':''}
    try:
        try:
            
            user = User.objects.get(pk=user)
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
            
            users = []
                        
            for collaborator in canvas.collaborators.all():
                print collaborator.username
                users.append({'name':collaborator.username,'id':collaborator.pk})
            
            return_message['collaborators'] = users
            
            return_message['message'] = "User is no longer a collaborator"
            return_message['success'] = True
        except:
            return_message['error'] = "User not removed"
            raise
    
    except:
        return_message['error'] = "Failed to rmove user from canvas"
    finally:
        json = simplejson.dumps(return_message)
        
        return HttpResponse(json, mimetype='application/json')

def node(request, pk):

    """
    Pipe dream.
    """

    return render_to_response("node.html", {'pk':pk})

@login_required
def collaborator_mini_form(request,pk):
    if request.is_ajax():
        canvas = get_object_or_404(Canvas, pk=pk)
        collaborators = canvas.collaborators
        
        return render_to_response('collaborator_mini_form.html', add_csrf(request, canvas=canvas, collaborators=collaborators, title='Add a collaborator'), context_instance=RequestContext(request))
    else:
        raise Http404

@login_required
def check_messages(request):
    if request.is_ajax():
        message_count = {}
        message_count['count'] = Message.objects.inbox_unread_count(request.user)
        json = simplejson.dumps(message_count)
        return HttpResponse(json, mimetype='application/json')
    else:
        raise Http404

def add_csrf(request, **kwargs):
    """Add CSRF to dictionary."""
    d = dict(user=request.user, **kwargs)
    d.update(csrf(request))
    return d