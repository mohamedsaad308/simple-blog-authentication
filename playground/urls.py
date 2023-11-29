from django.urls import path
from . import views

# URLConf
urlpatterns = [path("hello/", views.HelloWorldView.as_view(), name='hello-world')]
