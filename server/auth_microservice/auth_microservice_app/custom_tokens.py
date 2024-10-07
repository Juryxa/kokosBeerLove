from rest_framework_simplejwt.tokens import RefreshToken

class CustomRefreshToken(RefreshToken):
    @classmethod
    def for_user(cls, user):
        token = super().for_user(user)
        token['is_superuser'] = user.is_superuser
        return token

    @property
    def access_token(self):
        token = super().access_token
        token['is_superuser'] = self['is_superuser']
        return token
