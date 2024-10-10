from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.getAllTasks, name='task-list'),  # Get all tasks
    # Get tasks for the authenticated user
    path('my/', views.getUserTasks, name='user-task-list'),
    path('create/', views.createTask,
         name='task-create'),  # Create a new task
    path('update/<int:task_id>/', views.updateTask,
         name='task-detail'),  # Update task details
    path('delete/<int:task_id>/', views.deleteTask,
         name='task-delete'),  # Delete a task
]
