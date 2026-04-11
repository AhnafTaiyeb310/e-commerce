from rest_framework import serializers
from e_commerce.users.models import User
from dj_rest_auth.registration.serializers import RegisterSerializer
from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC

class UserSerializer(serializers.ModelSerializer[User]):
    class Meta:
        model = User
        fields = ["name", "url"]

        extra_kwargs = {
            "url": {"view_name": "api:user-detail", "lookup_field": "pk"},
        }

class CustomRegisterSerializer(RegisterSerializer):
    username = None
    name = serializers.CharField(required=True)

    def get_cleaned_data(self): 
        data = super().get_cleaned_data()
        data.pop('username', None)
        data['name'] = self.validated_data.get('name', '')
        return data
    
    def save(self, request):
        user = super().save(request)
        user.name = self.validated_data.get('name', '')
        user.save()
        return user


class EmailVerificationSerializer(serializers.Serializer):
    """Serializer for email verification"""
    key = serializers.CharField(required=True)
