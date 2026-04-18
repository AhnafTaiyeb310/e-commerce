from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import GenericViewSet

from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

from .serializers import EmailVerificationSerializer, UserSerializer
from e_commerce.users.models import User

class GoogleLogin(SocialLoginView):
    """
    Standard Google OAuth2 login endpoint.
    Uses cookies for JWT storage if configured in settings.
    """
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:3000/" # Match your frontend
    client_class = OAuth2Client
    permission_classes = [AllowAny]
    authentication_classes = []

class VerifyEmailAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = EmailVerificationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        key = serializer.validated_data['key']

        print(f"DEBUG: Received verification key: {key}")

        confirmation = EmailConfirmationHMAC.from_key(key)
        if not confirmation:
            try:
                confirmation = EmailConfirmation.objects.get(key=key)
            except EmailConfirmation.DoesNotExist:
                return Response(
                    {"error": "Invalid or expired key", "received_key": key}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

        confirmation.confirm(request)
        return Response({"message": "Email verified successfully"}, status=status.HTTP_200_OK)


class UserViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        assert isinstance(self.request.user.id, int)
        return self.queryset.filter(id=self.request.user.id)

    @action(detail=False)
    def me(self, request):
        serializer = UserSerializer(request.user, context={"request": request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)
