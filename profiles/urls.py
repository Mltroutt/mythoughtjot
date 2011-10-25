from django.conf.urls.defaults import patterns, include, url

urlpatterns = patterns('',
    (r'^register/$', 'profiles.views.register'),
)
