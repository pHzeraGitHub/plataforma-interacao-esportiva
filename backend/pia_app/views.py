# backend/pia_app/views.py

import random
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import JogadorAvulso, Pessoa
from .serializers import JogadorAvulsoSerializer, PessoaSerializer

class JogadorAvulsoViewSet(viewsets.ModelViewSet):
    queryset = JogadorAvulso.objects.all()
    serializer_class = JogadorAvulsoSerializer

class PessoaViewSet(viewsets.ModelViewSet):
    queryset = Pessoa.objects.all()
    serializer_class = PessoaSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sortear_times(request):
    """
    Sorteia 10 pessoas (por padrão) e divide em 2 times.
    Use ?qtd=8 para sortear 8, etc.
    """
    try:
        qtd = int(request.query_params.get('qtd', 10))
    except ValueError:
        return Response({"detail": "Parâmetro 'qtd' inválido."}, status=400)

    todas = list(Pessoa.objects.all())
    if len(todas) < qtd:
        return Response(
            {"detail": f"Existem apenas {len(todas)} pessoas cadastradas."},
            status=400
        )

    sorteadas = random.sample(todas, qtd)
    meio = qtd // 2
    team1 = sorteadas[:meio]
    team2 = sorteadas[meio:]

    return Response({
        "team1": PessoaSerializer(team1, many=True).data,
        "team2": PessoaSerializer(team2, many=True).data,
    })
