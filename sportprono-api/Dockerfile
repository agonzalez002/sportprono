# sportprono-api/Dockerfile
FROM python:3.12-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY requirements.txt /app/

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code source de l'application
COPY . /app/

# Exposer le port 8000
EXPOSE 8000

# Commande pour démarrer le serveur Django avec Gunicorn
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]