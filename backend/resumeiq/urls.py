from django.urls import path
from .views import UploadResumeView, AnalysisListView, AnalysisDetailView
 
urlpatterns = [
    path('upload/',          UploadResumeView.as_view(),    name='upload'),
    path('analyses/',        AnalysisListView.as_view(),    name='analyses'),
    path('analyses/<int:pk>/', AnalysisDetailView.as_view(), name='analysis-detail'),
]
