from rest_framework import serializers
from .models import JogadorAvulso

class JogadorAvulsoSerializer(serializers.ModelSerializer):
    class Meta:
        model = JogadorAvulso
        fields = ['id', 'pessoa', 'posicao', 'disponibilidade', 'nota', 'data_insert']

# backend/pia_app/serializers.py
from .models import Pessoa
class PessoaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pessoa
        fields = ['id','email']
