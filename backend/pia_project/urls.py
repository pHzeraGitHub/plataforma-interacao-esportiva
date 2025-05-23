from django.urls import path, include
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({'status': 'Backend OK'})

urlpatterns = [
    path('', health_check),
    path('api/v2/', include('pia_app.urls_v2')),
]
