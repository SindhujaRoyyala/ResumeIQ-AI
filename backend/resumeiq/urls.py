from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import UploadResumeView, AnalysisListView, AnalysisDetailView, RegisterView, LogoutView

urlpatterns = [
    path('register/',        RegisterView.as_view(),        name='register'),
    path('login/',           obtain_auth_token,             name='login'),
    path('logout/',          LogoutView.as_view(),          name='logout'),
    path('upload/',          UploadResumeView.as_view(),    name='upload'),
    path('analyses/',        AnalysisListView.as_view(),    name='analyses'),
    path('analyses/<int:pk>/', AnalysisDetailView.as_view(), name='analysis-detail'),
]
