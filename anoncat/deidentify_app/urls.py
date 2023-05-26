from django.urls import path
from deidentify_app.views import deidentify

urlpatterns = [
    path('api/deidentify/', deidentify),
]
