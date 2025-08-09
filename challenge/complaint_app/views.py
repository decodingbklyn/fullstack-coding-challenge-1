from urllib import request
from rest_framework import viewsets
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from django.db import models
from rest_framework import status
from .helpers import get_user_profile_and_district

class ComplaintViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = ComplaintSerializer

    def list(self, request):
        user_profile, padded_district = get_user_profile_and_district(request)
        if not user_profile:
            return Response({'error': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)
        complaints = Complaint.objects.filter(account=f'NYCC{padded_district}')
        serializer = ComplaintSerializer(complaints, many=True)
        return Response(serializer.data)

class OpenCasesViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = ComplaintSerializer

    def list(self, request):
        user_profile, padded_district = get_user_profile_and_district(request)
        if not user_profile:
            return Response({'error': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)
        open_complaints = Complaint.objects.filter(account=f'NYCC{padded_district}', closedate__isnull=True)
        serializer = ComplaintSerializer(open_complaints, many=True)
        return Response(serializer.data)

class ClosedCasesViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = ComplaintSerializer

    def list(self, request):
        user_profile, padded_district = get_user_profile_and_district(request)
        if not user_profile:
            return Response({'error': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)
        closed_complaints = Complaint.objects.filter(account=f'NYCC{padded_district}', closedate__isnull=False)
        serializer = ComplaintSerializer(closed_complaints, many=True)
        return Response(serializer.data)

class TopComplaintTypeViewSet(viewsets.ViewSet):
    http_method_names = ['get']

    def list(self, request):
        user_profile, padded_district = get_user_profile_and_district(request)
        if not user_profile:
            return Response({'error': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)
        top_complaint_types = Complaint.objects.filter(account=f'NYCC{padded_district}') \
            .values('complaint_type') \
            .annotate(count=models.Count('id')) \
            .order_by('-count')[:3]
        return Response(list(top_complaint_types))

class ConstituentsComplaintsViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = ComplaintSerializer

    def list(self, request):
        user_profile, padded_district = get_user_profile_and_district(request)
        if not user_profile:
            return Response({'error': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)
        complaints = Complaint.objects.filter(council_dist=f'NYCC{padded_district}')
        serializer = ComplaintSerializer(complaints, many=True)
        return Response(serializer.data)