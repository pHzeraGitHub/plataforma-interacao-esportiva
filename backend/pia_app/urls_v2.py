from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PessoaViewSet, JogadorAvulsoViewSet, sortear_times

router = DefaultRouter()
router.register(r'pessoas', PessoaViewSet, basename='pessoa')
router.register(r'jogadores-avulsos', JogadorAvulsoViewSet, basename='jogadoravulso')

urlpatterns = [
    # rotas padrão de CRUD
    path('', include(router.urls)),
    # rota de sorteio de times
    path('sorteio-times/', sortear_times, name='sorteio-times'),
]
