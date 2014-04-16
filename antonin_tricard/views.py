from antonin_tricard.models import NestedGallery
from django.shortcuts import render_to_response

def gallery(request, uuid):
    context = {}
    uuid = int(uuid)

    gal = NestedGallery.objects.get(id=uuid)

    context["nesteds"] = gal.nestedgallery_set.all()
    if not context["nesteds"]:
        print "adding ophotios"
        context["photos"] = gal.photos.all()
    else:
        context["photos"] = []
    for photo in context["photos"]:
        print photo.image.url
    return render_to_response("subgallery.html", context)

def home(request):
    context = {}
    galleries = NestedGallery.objects.all()
    root_galleries = []
    for gallery in galleries:
        if gallery.parent is None:
            root_galleries.append(gallery)

    context["nesteds"] = root_galleries
    return render_to_response("subgallery.html", context)
