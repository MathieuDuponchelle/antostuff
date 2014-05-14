from antonin_tricard.models import NestedGallery
from django.shortcuts import render_to_response
import sys

def gallery(request, uuid):
    context = {}
    uuid = int(uuid)

    gal = NestedGallery.objects.get(id=uuid)

    context["nesteds"] = gal.nestedgallery_set.all()
    if not context["nesteds"]:
        context["photos"] = gal.photos.all()
    else:
        context["photos"] = []
    return render_to_response("subgallery.html", context)

def home(request):
    context = {}

    galleries = NestedGallery.objects.all()
    root_galleries = []
    photos = []
    for gallery in galleries:
        for photo in gallery.public():
            photo.dummy = gallery.title
            photos.append(photo)
        if gallery.parent is None:
            root_galleries.append(gallery)

    context["galleries"] = NestedGallery.objects.all()
    context["photos"] = photos
    return render_to_response("subgallery.html", context)
