from django.shortcuts import get_object_or_404, render_to_response

def canvas(request, pk):
    return render_to_response("canvas.html", {'pk':pk})

def node(request, pk):
    return render_to_response("node.html", {'pk':pk})