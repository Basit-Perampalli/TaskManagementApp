from django.urls import include,re_path
from rest_framework.routers import DefaultRouter

from .views import TaskDocumentView

router = DefaultRouter()
books = router.register(r'task',
                        TaskDocumentView,
                        basename='taskdocument')

urlpatterns = [
    re_path(r'^', include(router.urls)),
]