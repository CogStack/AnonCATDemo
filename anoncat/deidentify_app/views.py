from django.shortcuts import render
from .forms import DeidentifyForm
from .models import DeidentifiedText
from medcat.cat import CAT
from medcat.utils.ner import deid_text

cat = CAT.load_model_pack("/Users/anthonyshek/projects/deidentify/anoncat/deidentify_app/models/deid_medcat_n2c2_modelpack.zip") # Load a model

# Create your views here.
def deidentify(request):
    if request.method == 'POST':
        form = DeidentifyForm(request.POST)
        if form.is_valid():
            input_text = form.cleaned_data['input_text']
            redact = form.cleaned_data['redact']

            # Deidentify the input_text here using the MedCAT deid method
            output_text = deid_text(cat, input_text, redact=redact)
            #output_text = output_text.replace('\n', '<br>') # TODO check this
            # "Deidentified text should be assigned till here"

            deidentified_text = DeidentifiedText.objects.create(
                input_text=input_text,
                output_text=output_text
            )
            return render(request, 'deidentify_demo.html', {'form': form, 'output_text': output_text})
    else:
        form = DeidentifyForm()
        return render(request, 'deidentify_demo.html', {'form': form})


def basic_deidentify(request):
    if request.method == 'POST':
        form = DeidentifyForm(request.POST)
        if form.is_valid():
            input_text = form.cleaned_data['input_text']
            # Deidentify the input_text here using a simple method
            output_text = ""
            for char in input_text:
                if char == " ":
                    output_text += " "
                else:
                    output_text += "X"
            # "Deidentified text should be assigned till here"
            deidentified_text = DeidentifiedText.objects.create(
                input_text=input_text,
                output_text=output_text
            )
            return render(request, 'deidentify_demo.html', {'form': form, 'output_text': output_text})
    else:
        form = DeidentifyForm()
        return render(request, 'deidentify_demo.html', {'form': form})
