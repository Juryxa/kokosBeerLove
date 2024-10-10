# Используем базовый образ с установленными зависимостями
FROM python:3.12-alpine

# Установим необходимые пакеты для сборки
RUN apk add --no-cache gcc musl-dev python3-dev linux-headers

# Устанавливаем рабочую директорию
WORKDIR /match_microservice

# Скопируй файл с зависимостями в контейнер
COPY requirements.txt .

RUN wget https://github.com/eficode/wait-for/releases/download/v2.1.0/wait-for -O /usr/local/bin/wait-for && chmod +x /usr/local/bin/wait-for

# Установи зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем код микросервиса
COPY . /match_microservice


# Окружающие переменные для Django
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Открываем порт для приложения
EXPOSE 8002

# Запускаем сервер Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8002"]
