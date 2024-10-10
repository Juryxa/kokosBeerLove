@echo off
start "auth" cmd /k "cd C:\Users\dima1\PycharmProjects\hakaton\kokosBeerLove && .\venv\Scripts\activate && cd C:\Users\dima1\PycharmProjects\hakaton\kokosBeerLove\server\auth_microservice && python manage.py runserver 8000"
start "match" cmd /k "cd C:\Users\dima1\PycharmProjects\hakaton\kokosBeerLove && .\venv\Scripts\activate && cd C:\Users\dima1\PycharmProjects\hakaton\kokosBeerLove\server\match_microservice && python manage.py runserver 8002"
start "news" cmd /k "cd C:\Users\dima1\PycharmProjects\hakaton\kokosBeerLove && .\venv\Scripts\activate && cd C:\Users\dima1\PycharmProjects\hakaton\kokosBeerLove\server\news_microservice && python manage.py runserver 8001"
start "shop" cmd /k "cd C:\Users\dima1\PycharmProjects\hakaton\kokosBeerLove && .\venv\Scripts\activate && cd C:\Users\dima1\PycharmProjects\hakaton\kokosBeerLove\server\shop_microservice && python manage.py runserver 8003"

pause
