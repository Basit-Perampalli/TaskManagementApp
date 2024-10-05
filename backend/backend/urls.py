# urls file for backend

from django.contrib import admin
from django.urls import path, include, re_path
from search_indexes import urls as search_index_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('task.urls')),
    re_path(r'^search/', include(search_index_urls)),
]
