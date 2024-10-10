# Generated by Django 5.1 on 2024-10-10 20:39

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("task", "0011_alter_task_priority"),
    ]

    operations = [
        migrations.AlterField(
            model_name="task",
            name="priority",
            field=models.CharField(
                choices=[
                    ("Low", "Low"),
                    ("Medium", "Medium"),
                    ("High", "High"),
                    ("H", "H"),
                ],
                max_length=10,
            ),
        ),
    ]
