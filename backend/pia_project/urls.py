from django.urls import path, include
from django.http import JsonResponse
from django.contrib import admin

def health_check(request):
    return JsonResponse({'status': 'Backend OK'})

urlpatterns = [
    path('', health_check),
    path('admin/', admin.site.urls),
    path('api/v2/', include('pia_app.urls_v2')),
]

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', health_check),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v2/', include('pia_app.urls_v2')),
]