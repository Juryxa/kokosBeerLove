# Этап сборки
FROM python:3.12-alpine AS builder

# Устанавливаем зависимости для сборки
RUN apk add --no-cache gcc musl-dev python3-dev linux-headers libpq-dev busybox-extras

# Устанавливаем рабочую директорию
WORKDIR /news_microservice
# Копируем файл с зависимостями
COPY requirements.txt .

# Собираем колеса (wheels) для зависимостей
RUN pip wheel --no-cache-dir --wheel-dir /wheels -r requirements.txt

# Финальный этап
FROM python:3.12-alpine

# Устанавливаем зависимости для выполнения
RUN apk add --no-cache libpq

# Устанавливаем рабочую директорию
WORKDIR /news_microservice

# Копируем колеса из этапа сборки и устанавливаем зависимости
COPY --from=builder /wheels /wheels
RUN pip install --no-cache-dir /wheels/*

# Копируем код приложения
COPY . /news_microservice

# Устанавливаем переменные окружения
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Открываем порт
EXPOSE 8001

# Задаем команду по умолчанию для запуска сервера
CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]




