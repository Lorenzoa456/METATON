#   PROJET BOT MUSICAL   #
## Table des matières

- [Prérequis](Prérequis)
- [Installation](Installation)
- [Features](Features)

## Prérequis

Vérifier si vous avez :

- Node.js et npm d'installés
- Une connexion à une base de donnée MongoDB
- Git d'installé

## Installation et déploiment

1. Cloner le répertoire
   
2. Installer les dépendances avec :

  ```sh
  npm i
  ```
  NB : Penser à faire cette commande dans le dossier frontend et backend du projet
  
3. Pour lancer le serveur, mettez :

```sh
cd backend
npm start
```

4. Inviter le bot dans votre serveur

5. Demander au bot de rejoindre un canal vocal avec :

```sh
!join
```
ou
```sh
!summon [nom du channel]
```

6. Choisissez une musqique dans webUi puis démarrer l'audio player du bot avec 

```sh
!start
```

## Features

Ce projet est composé d'un WebUI, d'un bot discord, d'un server backend permettant la communication avec une base de données MongoDB ainsi que d'héberger un server websocket. Ces composants permmetent les choses suivantes :

- upload une musique via le webUI dans la base de données ainsi que de la modifier et la supprimer dans la base de données
- Choisir la musique parmi toutes les musiques disponible dans la base de données et la faire jouer par le bot discord
- Dire au bot de mettre en pause la musique ou passer à la prochaine musique

