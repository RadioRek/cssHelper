from django.urls import path
from . import views

urlpatterns = [
    path('', views.ortegaNicolas, name='home'),
    path('flex/', views.flex, name='flex'),
    path('grid/', views.grid, name='grid'),
    path('ortegaNicolas/', views.ortegaNicolas, name='ortegaNicolas'),

]
