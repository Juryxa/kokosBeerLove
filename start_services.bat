@echo off
start "auth" cmd /k "cd C:\Users\79259\WebstormProjects\kokos\server\auth_microservice && python manage.py runserver 8000"
start "match" cmd /k "cd C:\Users\79259\WebstormProjects\kokos\server\match_microservice && python manage.py runserver 8002"
start "news" cmd /k "cd C:\Users\79259\WebstormProjects\kokos\server\news_microservice && python manage.py runserver 8001"
start "shop" cmd /k "cd C:\Users\79259\WebstormProjects\kokos\server\shop_microservice && python manage.py runserver 8003"
start "kokoc_team" cmd /k "cd C:\Users\79259\WebstormProjects\kokos\server\kokoc_team_microservice && python manage.py runserver 8004"

pause
