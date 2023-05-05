from django import forms
from .models import DeidentifiedText

class DeidentifyForm(forms.ModelForm):
    class Meta:
        model = DeidentifiedText
        fields = ['input_text']
        widgets = {
            'input_text': forms.Textarea(attrs={'rows': 4}),
        }
