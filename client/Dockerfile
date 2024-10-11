# Шаг 1: Сборка фронтенда
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной исходный код приложения в контейнер
COPY . ./

# Собираем фронтенд-приложение
RUN npm run build

# Проверяем содержимое папки dist
RUN ls -la /app/dist

# Шаг 2: Обслуживание фронтенда через Nginx
FROM nginx:alpine

# Удаляем стандартный конфигурационный файл Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем наш кастомный конфигурационный файл Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем собранные файлы фронтенда из предыдущего шага
COPY --from=build /app/dist /usr/share/nginx/html

# Создаем директории для загрузки файлов
RUN mkdir -p /uploads/news_images /uploads/shop_images

# Устанавливаем права доступа
RUN chmod -R 755 /uploads

# Открываем порт 80
EXPOSE 80

# Запускаем сервер Nginx
CMD ["nginx", "-g", "daemon off;"]
