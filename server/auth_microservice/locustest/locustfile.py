import random
import string
from locust import HttpUser, TaskSet, task, between


#для нагрузочного тестирования
#locust --users 100 --spawn-rate 15 -f locustfile.py --host=http://localhost:8000

# Функция для генерации случайного имени
def generate_random_name(length=8):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for _ in range(length))


# Класс задач
class UserBehavior(TaskSet):

    @task
    def signup(self):
        # Генерация случайного имени и email
        name = generate_random_name()
        email = f"{name}@mail.ru"

        # Параметры для signup
        signup_data = {
            "username": name,
            "email": email,
            "password": "testpassword123"
        }

        # Отправка POST-запроса на /signup
        self.client.post("/api/signup/", json=signup_data)


# Класс пользователя
class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(0, 0)  # Установите время ожидания между запросами
