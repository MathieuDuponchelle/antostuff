from django.db import models
from photologue.models import Gallery

class SubGallery(models.Model):
    name = models.CharField(max_length=400)
    description = models.TextField()
    parent = models.ForeignKey('self', null=True, blank=True, default=None)

    def __unicode__(self):
        return unicode(self.name)

class NestedGallery(Gallery):
    parent = models.ForeignKey('self', blank=True, null=True, default=None)

    def get_thumb(self):
        print self.id
        return self.photos.all()[0].get_display_url()

    def __unicode__(self):
        return unicode(self.title)
