
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer

from  .documents import TaskDocument

class TaskDocumentSerializer(DocumentSerializer):

    class Meta:
        document = TaskDocument
        fields = ['id', 'title', 'description','priority', 'status','due_date','author']
        read_only_fields = ['id', 'author', 'created_at', 'updated_at']