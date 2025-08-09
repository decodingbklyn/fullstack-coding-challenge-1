from django.test import TestCase
from django.contrib.auth.models import User
from .models import UserProfile, Complaint
from rest_framework.test import APIClient

class ComplaintAPITest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.profile = UserProfile.objects.create(user=self.user, district='1')
        Complaint.objects.create(unique_key='C1', account='NYCC01', council_dist='NYCC01', complaint_type='Noise')
        Complaint.objects.create(unique_key='C2', account='NYCC01', council_dist='NYCC02', complaint_type='Trash')
        self.client = APIClient()
        self.client.login(username='testuser', password='testpass')

    def test_all_complaints_endpoint(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/complaints/allComplaints/')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(any(c['unique_key'] == 'C1' for c in response.data))

    def test_constituents_complaints_endpoint(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/complaints/constituentsComplaints/')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(all(c['council_dist'] == 'NYCC01' for c in response.data))