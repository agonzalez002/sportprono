# sportprono-web/Dockerfile
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json /app/

# Installer les dépendances
RUN npm install

# Copier le code source de l'application
COPY . /app/

# Construire l'application React
RUN npm run build

# Exposer le port 3000
EXPOSE 5173

# Commande pour démarrer l'application React
CMD ["npm", "run", "dev"]
