from django_elasticsearch_dsl import Document, Index, fields
from task.models import Task
from elasticsearch_dsl import analyzer

# Define an Elasticsearch index for Task
TASK_INDEX = Index('task')

# Configure index settings (optional)
TASK_INDEX.settings(
    number_of_shards=1,
    number_of_replicas=1
)

# Custom analyzer for stripping HTML and applying standard tokenization
html_strip = analyzer(
    'html_strip',
    tokenizer="standard",
    filter=["lowercase", "stop", "snowball"],
    char_filter=["html_strip"]
)

# Define the Elasticsearch document for Task
@TASK_INDEX.doc_type
class TaskDocument(Document):
    id = fields.IntegerField(attr='id')
    title = fields.TextField(
        analyzer=html_strip,
        fields={
            'raw': fields.KeywordField(),
        }
    )
    description = fields.TextField(
        analyzer=html_strip,
        fields={
            'raw': fields.KeywordField(),
        }
        )
    priority = fields.KeywordField()
    status = fields.BooleanField()
    due_date = fields.DateField()
    created_at = fields.DateField()
    updated_at = fields.DateField()

    class Django:
        model = Task  # The model associated with this document
