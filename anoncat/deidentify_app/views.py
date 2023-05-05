from django.shortcuts import render
from .forms import DeidentifyForm
from .models import DeidentifiedText

# Create your views here.
def deidentify(request):
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
