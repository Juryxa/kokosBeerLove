@echo off
start "auth" cmd /k "cd C:\Users\fmann\Desktop\vscode\reactjs\kokosBeerLove\server\auth_microservice && python manage.py runserver 8000"
start "match" cmd /k "cd C:\Users\fmann\Desktop\vscode\reactjs\kokosBeerLove\server\match_microservice && python manage.py runserver 8002"
start "news" cmd /k "cd C:\Users\fmann\Desktop\vscode\reactjs\kokosBeerLove\server\news_microservice && python manage.py runserver 8001"
start "shop" cmd /k "cd C:\Users\fmann\Desktop\vscode\reactjs\kokosBeerLove\server\shop_microservice && python manage.py runserver 8003"
start "kokoc_team" cmd /k "cd C:\Users\fmann\Desktop\vscode\reactjs\kokosBeerLove\server\kokoc_team_microservice && python manage.py runserver 8004"
pause
