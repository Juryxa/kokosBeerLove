from django.db import models

class Player(models.Model):
    ROLE_CHOICES = [
        ('защитник', 'Защитник'),
        ('нападающий', 'Нападающий'),
        ('вратарь', 'Вратарь'),
        ('полузащитник', 'Полузащитник'),
    ]

    first_name = models.CharField(max_length=100)  # Имя
    last_name = models.CharField(max_length=100)  # Фамилия
    middle_name = models.CharField(max_length=100, blank=True, null=True)  # Отчество (может быть пустым)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)  # Роль
    games_played = models.PositiveIntegerField(default=0)  # Сыграно игр
    goals_scored = models.PositiveIntegerField(default=0)  # Забито голов
    assists_made = models.PositiveIntegerField(default=0)  # Отдано пасов
    yellow_cards = models.PositiveIntegerField(default=0)  # Желтые карточки
    red_cards = models.PositiveIntegerField(default=0)  # Красные карточки
    photo_url = models.URLField(max_length=500, blank=True)  # URL фотографии игрока

    class Meta:
        db_table = 'kokoc_players'

    def __str__(self):
        return f'{self.first_name} {self.last_name} ({self.role})'