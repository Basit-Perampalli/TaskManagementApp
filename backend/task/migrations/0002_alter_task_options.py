# Generated by Django 5.1 on 2024-10-06 20:21

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("task", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="task",
            options={"ordering": ["due_date"]},
        ),
    ]
