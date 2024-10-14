from rest_framework import serializers

from .models import CustomUser


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data["username"],
            email=validated_data["email"],
            first_name="",  # Поля профиля будут пустыми при регистрации
            last_name="",
            phone_number="",
            telegram="",
            avatar_url="",
        )
        user.set_password(validated_data["password"])  # Шифруем пароль
        user.save()
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "first_name",
            "last_name",
            "phone_number",
            "telegram",
            "avatar_url"]


class UserAllDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'first_name', 'last_name', 'phone_number', 'telegram', 'avatar_url']

class AvatarUploadSerializer(serializers.Serializer):
    avatar_url = serializers.URLField(required=True)


class EmailVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(required=True) 


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class RefreshTokenSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()


class LogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()


class VerifyEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)
