from django import forms
from django.middleware.csrf import get_token
from .models import DeidentifiedText

class DeidentifyForm(forms.ModelForm):
    redact = forms.BooleanField(required=False, initial=False)

    def __init__(self, request=None, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = DeidentifiedText
        fields = ['input_text']
        widgets = {
            'input_text': forms.Textarea(attrs={'rows': 90}),
        }
