from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('flex/', views.flex, name='flex'),
    path('grid/', views.grid, name='grid'),
    path('portafolio/', views.portafolio, name='portafolio'),
]
