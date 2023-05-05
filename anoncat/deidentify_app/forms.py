from django import forms
from .models import DeidentifiedText

class DeidentifyForm(forms.ModelForm):
    redact = forms.BooleanField(required=False, initial=False)
    class Meta:
        model = DeidentifiedText
        fields = ['input_text']
        widgets = {
            'input_text': forms.Textarea(attrs={'rows': 4}),
        }
