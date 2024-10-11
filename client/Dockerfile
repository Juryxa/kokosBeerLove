# Шаг 1: Сборка фронтенда
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Шаг 2: Обслуживание фронтенда через Nginx
FROM nginx:alpine

# Удаляем стандартный конфигурационный файл Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем наш кастомный конфигурационный файл Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем собранные файлы фронтенда из предыдущего шага
COPY --from=build /app/dist /usr/share/nginx/html

# Создаем директории для загрузки файлов
RUN mkdir -p /uploads/news_images /uploads/shop_images /uploads/player_photos /uploads/team_logos

# Устанавливаем владельца и права доступа для кэша Nginx и директории /uploads
RUN chown -R nginx:nginx /var/cache/nginx /uploads

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
