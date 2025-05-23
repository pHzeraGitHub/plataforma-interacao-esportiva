# backend/pia_app/models.py

from django.db import models
from django.db.models import JSONField  # para armazenar lista de dias em SQLite ou multi-banco

class Pessoa(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    telefone = models.CharField(max_length=20, blank=True)

    class Meta:
        db_table = 'pessoa'

    def __str__(self):
        return self.email


class JogadorAvulso(models.Model):
    id = models.AutoField(primary_key=True)
    pessoa = models.ForeignKey(
        Pessoa,
        on_delete=models.CASCADE,
        db_column='id_pessoa',
        related_name='avulsos'
    )
    posicao = models.CharField(max_length=50)
    disponibilidade = models.BooleanField(default=True)
    nota = models.FloatField(default=0.0)
    data_insert = models.DateTimeField(auto_now_add=True)
    horario = models.TimeField(null=True, blank=True)
    disponibilidades = JSONField(default=list, blank=True)

    class Meta:
        db_table = 'jogador_avulso'

    def __str__(self):
        return f'{self.pessoa.email} - {self.posicao}'
