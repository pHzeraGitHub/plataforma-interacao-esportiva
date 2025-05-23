# backend/pia_app/views.py
from rest_framework import viewsets
from .models import JogadorAvulso, Pessoa
from .serializers import JogadorAvulsoSerializer, PessoaSerializer

class JogadorAvulsoViewSet(viewsets.ModelViewSet):
    queryset = JogadorAvulso.objects.all()
    serializer_class = JogadorAvulsoSerializer

class PessoaViewSet(viewsets.ModelViewSet):
    queryset = Pessoa.objects.all()
    serializer_class = PessoaSerializer