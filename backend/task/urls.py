from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.getAllTasks, name='task-list'),  # Get all tasks
    # Get tasks for the authenticated user
    path('user/tasks/', views.getUserTasks, name='user-task-list'),
    path('tasks/create/', views.createTask,
         name='task-create'),  # Create a new task
    path('tasks/<int:task_id>/', views.updateTask,
         name='task-detail'),  # Update task details
    path('tasks/<int:task_id>/delete/', views.deleteTask,
         name='task-delete'),  # Delete a task
]
