# Разработка веб-платформы для ФК и болельщиков футбола 

Этот проект реализован с использованием микросервисной архитектуры. Фронтенд выполнен на React с использованием TypeScript, а бэкенд — на Django. Проект обслуживается через Nginx с Redis для кэширования, а контейнеры оркестрируются с помощью Docker Compose.

## Стек технологий

- **Frontend:** React + TypeScript
- **Backend:** Python + Django + Django REST Framework
- **Proxy:** Nginx
- **Кэширование:** Redis
- **Контейнеризация:** Docker Compose

## Требования

Перед запуском убедитесь, что на вашей машине установлены следующие зависимости:

- Docker
- Docker Compose
- mkcert (для создания локальных SSL-сертификатов)
- Python 3.8+
- PostgreSQL
- Node.js (для сборки фронтенда)

## Установка и запуск проекта

### 1. Клонирование репозитория

Склонируйте репозиторий:

```bash
git clone https://github.com/Juryxa/kokosBeerLove
```
### 2. Настройка переменных окружения

Создайте файл .env в корне проекта. Пример, со скрытыми паролями .env для микросервисов:
```env
SECRET_KEY_AUTH=***hidden***
SECRET_KEY_NEWS=***hidden***
SECRET_KEY_SHOP=***hidden***
SECRET_KEY_MATCH=***hidden***
SECRET_KEY_KOKOC_TEAM=***hidden***
SECRET_KEY_FUN_HUB=***hidden***

# auth settings db
DATABASE_NAME_AUTH=kokocDB_auth_microservice
DATABASE_USER_AUTH=postgres
DATABASE_PASSWORD_AUTH=***hidden***
DATABASE_HOST_AUTH=localhost
DATABASE_PORT_AUTH=5432

# news settings db
DATABASE_NAME_NEWS=kokocDB_news_microservice
DATABASE_USER_NEWS=postgres
DATABASE_PASSWORD_NEWS=***hidden***
DATABASE_HOST_NEWS=localhost
DATABASE_PORT_NEWS=5432

# shop settings db
DATABASE_NAME_SHOP=kokocDB_shop_microservice
DATABASE_USER_SHOP=postgres
DATABASE_PASSWORD_SHOP=***hidden***
DATABASE_HOST_SHOP=localhost
DATABASE_PORT_SHOP=5432

# match settings db
DATABASE_NAME_MATCH=kokocDB_match_microservice
DATABASE_USER_MATCH=postgres
DATABASE_PASSWORD_MATCH=***hidden***
DATABASE_HOST_MATCH=localhost
DATABASE_PORT_MATCH=5432

# kokoc_team settings db
DATABASE_NAME_KOKOC_TEAM=kokocDB_kokoc_team_microservice
DATABASE_USER_KOKOC_TEAM=postgres
DATABASE_PASSWORD_KOKOC_TEAM=***hidden***
DATABASE_HOST_KOKOC_TEAM=localhost
DATABASE_PORT_KOKOC_TEAM=5432

# fun_hub settings db
DATABASE_NAME_FUN_HUB=kokocDB_kokoc_team_microservice
DATABASE_USER_FUN_HUB=postgres
DATABASE_PASSWORD_FUN_HUB=***hidden***
DATABASE_HOST_FUN_HUB=localhost
DATABASE_PORT_FUN_HUB=5432

# JWT settings
JWT_SIGNING_KEY=***hidden***

# Email settings
EMAIL_HOST_AUTH=smtp.mail.ru
EMAIL_PORT_AUTH=587
EMAIL_USE_TLS_AUTH=True
EMAIL_HOST_USER_AUTH=ПочтаДляОтправкиКодаПодтверждения@mail.ru
EMAIL_HOST_PASSWORD_AUTH=***hidden***
```
### 3. Установка SSL-сертификатов (локальная разработка)
Используйте mkcert, чтобы создать локальные SSL-сертификаты:
```bash
mkcert -install
mkcert localhost
```
Переместите сертификаты в папку certificates/:
```bash
mkdir certificates
mv localhost.pem certificates/
mv localhost-key.pem certificates/
```
### 4. Сборка и запуск проекта с помощью Docker Compose
Для сборки и запуска проекта выполните:
```bash
docker-compose up --build
```
### 5. Создание администратора
Чтобы создать администратора для аутентификационного микросервиса, выполните:
```bash
docker-compose exec auth_microservice python manage.py createsuperuser
```
### 6. Доступ к проекту
После успешного запуска проекта фронтенд будет доступен по адресу:
```bash
https://localhost
```
API-документация (Swagger) для микросервисов доступна по следующему пути (port от 8000 до 8004) `/swagger/`:  
Либо можно скачать файлы:

[Скачать Swagger файл для auth_microservice](https://github.com/Juryxa/kokosBeerLove/blob/main/auth_microservice)  
[Скачать Swagger файл для kokoc_team_microservice](https://github.com/Juryxa/kokosBeerLove/blob/main/kokoc_team_microservice)  
[Скачать Swagger файл для match_microservice](https://github.com/Juryxa/kokosBeerLove/blob/main/match_microservice)  
[Скачать Swagger файл для news_microservice](https://github.com/Juryxa/kokosBeerLove/blob/main/news_microservice)  
[Скачать Swagger файл для shop_microservice](https://github.com/Juryxa/kokosBeerLove/blob/main/shop_microservice)

```bash
https://localhost:port/swagger/
```
## Сервисы
### Frontend (React + TypeScript)
Фронтенд построен с использованием React и TypeScript. Он собирается с помощью npm и обслуживается через Nginx. Вся статика хранится в контейнере Nginx.
### Backend (Django + Django REST Framework)
Backend реализован с использованием Django и Django REST Framework. Для авторизации используется JWT, а Redis отвечает за кэширование данных.
### Redis
Redis используется для кэширования данных и может быть интегрирован в Django через настройки CACHES.

## Примечания по безопасности
- **SSL:** Используйте mkcert только для локальной разработки. Для production-среды рекомендуется использовать Let's Encrypt или другие сертифицированные поставщики SSL.
- **CORS:**  Настройки CORS должны быть жестко контролированы в production. В файле .env установите соответствующие домены для CORS_ALLOWED_ORIGINS.
- **Среда выполнения:** Не забудьте отключить DEBUG в production.
