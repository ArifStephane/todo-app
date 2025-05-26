# Utilise une image Node.js officielle comme image de base
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et yarn.lock
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN yarn build

# Exposer le port sur lequel l'application va tourner
EXPOSE 3000

# Commande pour démarrer l'application
# CMD ["node", "dist/main.js"]
CMD ["yarn", "start", "dev"]
