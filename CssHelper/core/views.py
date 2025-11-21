from django.shortcuts import render

# Create your views here.


def home(request):
    return render(request, 'home.html')


def flex(request):
    return render(request, 'flex.html')


def grid(request):
    return render(request, 'grid.html')

def portafolio(request):
    return render(request, 'portafolio.html')