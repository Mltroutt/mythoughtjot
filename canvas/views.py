from django.shortcuts import get_object_or_404, render_to_response

def canvas(request, pk):
    return render_to_response("canvas/canvas.html", {'pk':pk})

def node(request, pk):
    return render_to_response("canvas/node.html", {'pk':pk})

def user(request, pk):
    return render_to_response("user/profile.html", {'pk':pk})
