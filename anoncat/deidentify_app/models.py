from django.db import models

# Create your models here.
class DeidentifiedText(models.Model):
    input_text = models.TextField()
    output_text = models.TextField()
