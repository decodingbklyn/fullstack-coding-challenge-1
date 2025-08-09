from .models import UserProfile

def get_user_profile_and_district(request):
    user = request.user
    try:
        user_profile = UserProfile.objects.get(user=user)
        padded_district = user_profile.district.zfill(2)
        return user_profile, padded_district
    except UserProfile.DoesNotExist:
        return None, None