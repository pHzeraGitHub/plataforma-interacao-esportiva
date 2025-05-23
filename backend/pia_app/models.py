from django.db import models

class Pessoa(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)

    class Meta:
        db_table = 'pessoa'

class JogadorAvulso(models.Model):
    id = models.AutoField(primary_key=True)
    pessoa = models.ForeignKey(Pessoa, on_delete=models.CASCADE, db_column='id_pessoa')
    posicao = models.CharField(max_length=50)
    disponibilidade = models.BooleanField(default=True)
    nota = models.FloatField(default=0.0)
    data_insert = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'jogador_avulso'
