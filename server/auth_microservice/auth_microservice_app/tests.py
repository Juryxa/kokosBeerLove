# from rest_framework.test import APITestCase
# from rest_framework import status
# from django.urls import reverse
# from auth_microservice_app.models import CustomUser
#
#
# class UserRegistrationTest(APITestCase):
#
#     def test_signup(self):
#         url = reverse('signup')  # Используем URL по имени 'signup'
#         data = {
#             "username": "testuser",
#             "email": "testuser@example.com",
#             "password": "strongpassword123"
#         }
#
#         # Отправляем POST-запрос на регистрацию
#         response = self.client.post(url, data, format='json')
#
#         # Проверяем, что запрос прошел успешно
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#
#         # Проверяем, что пользователь действительно создан
#         user = CustomUser.objects.get(email="testuser@example.com")
#         self.assertIsNotNone(user)
#
#         # Проверяем, что в ответе присутствуют токены
#         self.assertIn('access', response.data)
#         self.assertIn('refresh', response.data)
