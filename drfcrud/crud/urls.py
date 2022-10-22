
from django.urls import path
# Create your views here.
from crud import views
urlpatterns = [
    path('crud',views.crud),
    path('crud/update/<int:pk>/', views.crudupdate),
    path('',views.show)
    ]


