from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.forms import ModelForm

def register(request):
    if request.method == 'POST':
        user_form = UserCreationForm(request.POST, prefix='user_form')
        if user_form.is_valid():
            new_user = user_form.save()
            return HttpResponseRedirect('success page goes here')
    else:
        user_form = UserCreationForm()
    csrfContext = RequestContext(request,{'user_form':user_form})
    return render_to_response('registration/registration_form.html', csrfContext)

