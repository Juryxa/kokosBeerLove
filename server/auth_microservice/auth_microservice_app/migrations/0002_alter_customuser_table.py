# Generated by Django 4.2.16 on 2024-10-08 10:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auth_microservice_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='customuser',
            table='site_users',
        ),
    ]
