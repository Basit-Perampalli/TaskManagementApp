from django_elasticsearch_dsl_drf.viewsets import BaseDocumentViewSet
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    SearchFilterBackend,
    OrderingFilterBackend
)
from rest_framework.pagination import PageNumberPagination
from .documents import TaskDocument
from .serializers import TaskDocumentSerializer

class TaskPagination(PageNumberPagination):
    page_size = 7

class TaskDocumentView(BaseDocumentViewSet):
    document = TaskDocument
    serializer_class = TaskDocumentSerializer
    pagination_class = TaskPagination
    filter_backends = [
        FilteringFilterBackend,
        SearchFilterBackend,
        OrderingFilterBackend
    ]
    search_fields = (
        'title',
        'description',
    )
    filter_fields = {
        'title': 'title.raw',
        'description': 'description.raw',
        'priority': 'priority',
        'status': 'status',
        'due_date': 'due_date',
    }
    ordering_fields = {
        'due_date': 'due_date',
    }
