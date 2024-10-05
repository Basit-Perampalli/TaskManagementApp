
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer

from  .documents import TaskDocument

class TaskDocumentSerializer(DocumentSerializer):

    class Meta:
        document = TaskDocument
        fields = '__all__'