from django.shortcuts import render, redirect
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view

from medcat.cat import CAT
from medcat.utils.ner import deid_text
from rest_framework.response import Response

from .models import DeidentifiedText


cat = CAT.load_model_pack(settings.DEID_MODEL) # Load a model


# Create your views here.
def index(request):
    return render(request, 'frontend/deidentify_demo.html')


@api_view(http_method_names=['POST'])
def deidentify(request):
    input_text = request.data['input_text']
    redact = request.data['redact']
    output_text = deid_text(cat, input_text, redact=redact)

    # Save the form data to the DeidentifiedText model
    text = DeidentifiedText()
    text.input_text = input_text
    text.output_text = output_text
    text.save()

    return Response({'output_text': output_text})

