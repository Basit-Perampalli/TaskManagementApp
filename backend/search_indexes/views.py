from django_elasticsearch_dsl_drf.viewsets import BaseDocumentViewSet
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    CompoundSearchFilterBackend,
    OrderingFilterBackend
)
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
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
        CompoundSearchFilterBackend,
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

    # Add authentication classes and permissions
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Override the get_queryset method to filter tasks by the authenticated user.
        """
        # Extract the authenticated user
        user = self.request.user
        
        # Filter the tasks in Elasticsearch by the 'author' field (assuming 'author' field exists)
        queryset = super().get_queryset()
        print(user.email)
        # Return tasks where 'author' matches the authenticated user
        return queryset.filter("term", author=user.email)
