# Generated by Django 4.2.7 on 2023-12-07 21:00

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="user",
            options={},
        ),
        migrations.AlterModelManagers(
            name="user",
            managers=[],
        ),
        migrations.RemoveField(
            model_name="user",
            name="date_joined",
        ),
        migrations.RemoveField(
            model_name="user",
            name="first_name",
        ),
        migrations.RemoveField(
            model_name="user",
            name="last_name",
        ),
        migrations.RemoveField(
            model_name="user",
            name="username",
        ),
        migrations.AddField(
            model_name="user",
            name="name",
            field=models.CharField(default=django.utils.timezone.now, max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="user",
            name="is_active",
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="is_staff",
            field=models.BooleanField(default=False),
        ),
    ]
