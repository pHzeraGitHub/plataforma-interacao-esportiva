# backend/pia_app/urls_v2.py
from rest_framework.routers import DefaultRouter
from .views import JogadorAvulsoViewSet, PessoaViewSet

router = DefaultRouter()
router.register(r'pessoas', PessoaViewSet, basename='pessoa')
router.register(r'jogadores-avulsos', JogadorAvulsoViewSet, basename='jogadoravulso')

urlpatterns = router.urls
