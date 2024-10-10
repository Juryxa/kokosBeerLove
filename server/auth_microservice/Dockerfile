# Use official Python image as a base
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file from на уровень выше
COPY ./server/requirements.txt /app/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the container
COPY ./server/auth_microservice /app

# Set environment variables (for Django)
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Expose the port
EXPOSE 8000

# Run Django migrations and start the server
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
