from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC
from .serializers import EmailVerificationSerializer
from e_commerce.users.models import User
from .serializers import UserSerializer

class VerifyEmailAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = EmailVerificationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        key = serializer.validated_data['key']

        print(f"DEBUG: Received verification key: {key}")

        # Allauth logic to confirm the email
        confirmation = EmailConfirmationHMAC.from_key(key)
        if not confirmation:
            try:
                confirmation = EmailConfirmation.objects.get(key=key)
                print("DEBUG: Found confirmation in database")
            except EmailConfirmation.DoesNotExist:
                print(f"DEBUG: Key not found in HMAC or Database: {key}")
                return Response(
                    {"error": "Invalid or expired key", "received_key": key}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

        confirmation.confirm(request)
        print(f"DEBUG: Email confirmed successfully for key: {key}")
        return Response({"message": "Email verified successfully"}, status=status.HTTP_200_OK)


class UserViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = "pk"

    def get_queryset(self, *args, **kwargs):
        assert isinstance(self.request.user.id, int)
        return self.queryset.filter(id=self.request.user.id)

    @action(detail=False)
    def me(self, request):
        serializer = UserSerializer(request.user, context={"request": request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)


