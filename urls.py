from django.conf.urls.defaults import patterns, include, url
from django.views.generic.simple import direct_to_template


# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from django.conf import settings
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'mythoughtjot.views.home', name='home'),
    # url(r'^mythoughtjot/', include('mythoughtjot.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    url(r'^$', direct_to_template, {'template': 'djangoish_templates/index.html'}),
    #url(r'^profiles/', include('profiles.urls')),
    url(r'^canvas/(\d+)/$', 'canvas.views.canvas'),
    url(r'^node/(\d+)/$', 'canvas.views.node'),
    #url(r'^user/(\d+)/$', 'canvas.views.user'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('registration.backends.default.urls')),

)

if settings.DEBUG:
    from django.views.static import serve
    _media_url = settings.MEDIA_URL
    if _media_url.startswith('/'):
        _media_url = _media_url[1:]
        urlpatterns += patterns('',
            (r'^%s(?P<path>.*)$' % _media_url,
             serve,
            {'document_root': settings.MEDIA_ROOT}))
    del(_media_url, serve)