import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
 
from .models import ResumeAnalysis
from .serializers import ResumeUploadSerializer, ResumeAnalysisSerializer
from .ai_service import extract_text_from_file, compute_ats_score, get_ai_suggestions
 
 
class UploadResumeView(APIView):
    """POST /api/upload/ – upload a resume and receive analysis."""
 
    def post(self, request):
        serializer = ResumeUploadSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
        file     = serializer.validated_data['file']
        job_desc = serializer.validated_data.get('job_desc', '')
 
        # Save file to disk
        analysis = ResumeAnalysis.objects.create(
            file=file,
            filename=file.name,
            job_desc=job_desc,
            status='processing',
            user=request.user if request.user.is_authenticated else None,
        )
 
        try:
            file_path = analysis.file.path
 
            # 1. Extract text
            raw_text  = extract_text_from_file(file_path)
 
            # 2. ATS score
            score_data = compute_ats_score(raw_text, job_desc)
 
            # 3. AI suggestions
            suggestions = get_ai_suggestions(
                raw_text, job_desc, score_data['missing_kw']
            )
 
            # 4. Save results
            analysis.raw_text       = raw_text[:5000]
            analysis.ats_score      = score_data['ats_score']
            analysis.matched_kw     = score_data['matched_kw']
            analysis.missing_kw     = score_data['missing_kw']
            analysis.ai_suggestions = suggestions
            analysis.status         = 'done'
            analysis.save()
 
        except Exception as exc:
            analysis.status = 'failed'
            analysis.save()
            return Response(
                {'error': f'Analysis failed: {str(exc)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
 
        return Response(
            ResumeAnalysisSerializer(analysis).data,
            status=status.HTTP_201_CREATED,
        )
 
 
class AnalysisListView(APIView):
    """GET /api/analyses/ – list past analyses."""
 
    def get(self, request):
        qs = ResumeAnalysis.objects.filter(status='done').order_by('-created_at')[:20]
        return Response(ResumeAnalysisSerializer(qs, many=True).data)
 
 
class AnalysisDetailView(APIView):
    """GET /api/analyses/<id>/ – get one analysis."""
 
    def get(self, request, pk):
        try:
            obj = ResumeAnalysis.objects.get(pk=pk)
        except ResumeAnalysis.DoesNotExist:
            return Response({'error': 'Not found'}, status=404)
        return Response(ResumeAnalysisSerializer(obj).data)
