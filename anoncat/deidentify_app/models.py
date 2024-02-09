from django.db import models


class DeidentifiedText(models.Model):
    input_text = models.TextField()
    output_text = models.TextField()
