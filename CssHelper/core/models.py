from django.db import models

# Create your models here.
class message(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    mensaje = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre + ' - ' + self.email + ' - ' + self.mensaje[:20] + '...'