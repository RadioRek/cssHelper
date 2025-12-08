from django.shortcuts import render
from django.http import HttpResponse
from .models import message
# Create your views here.

def home(request):
    return render(request, 'home.html')

def flex(request):
    return render(request, 'flex.html')

def grid(request):
    return render(request, 'grid.html')

def ortegaNicolas(request):
    if request.method == 'GET':
        return render(request, 'portfolio.html')
    elif request.method == 'POST':
        nombre = request.POST.get('nombre')
        email = request.POST.get('email')
        mensaje = request.POST.get('mensaje')
        message_obj = message(nombre=nombre, email=email, mensaje=mensaje)
        message_obj.save()

        return render(request, 'portfolio.html', {'success': True})