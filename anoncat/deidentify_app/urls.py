from django.urls import path
from . import views

urlpatterns = [
    path('', views.deidentify, name='deidentify-demo'),
]
