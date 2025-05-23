# backend/pia_app/serializers.py

from rest_framework import serializers
from .models import Pessoa, JogadorAvulso

class PessoaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pessoa
        fields = ['id', 'email', 'telefone']


class JogadorAvulsoSerializer(serializers.ModelSerializer):
    class Meta:
        model = JogadorAvulso
        fields = [
            'id',
            'pessoa',
            'posicao',
            'disponibilidade',
            'nota',
            'data_insert',
            'horario',
            'disponibilidades',
        ]
