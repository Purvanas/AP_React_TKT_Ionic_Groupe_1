# AP_React_TKT_Ionic ZooPlanner
Ce projet est un AP réalisé dans le cadre de notre formation de 2ème année au BTS SIO de Satin Adjutor à Vernon. Il consistait à apréhender 2 nouveaux outils: Github et GitKraken, ainsi que le framework React.

Ce ReadMe vous détaillera tout le nécessaire afin que le projet puisse fonctionner sur votre machine dans le cas où vous le téléchargeriez.

## Prérequis
Ce projet fut réalisé en local à travers le framework React il vous faudra donc installer nodeJs. Il faudra également un SGBD utilisable en local comme WampServer ou MySQLServer.

- [nodeJs](https://nodejs.org/en)
- [WampServer](https://www.wampserver.com)  
- MySQLServer / etc.

## Installation des dépendences
Ouvrez le dossier et exécuter la commande ```npm i``` dans le dossier api-zooplnner-cerza et dans le dossier eooplanner-creza.
Puis effctuez les commandes npm start dans ces même dossiers

Si vous souhaitez modifier le projet dans sa structure de façon plus poussée que ce qu'il n'a été fait, vous pouvez bien évidemment ajouter d'autres outils comme vous le souhaitez.

Pour le reste, il vous suffit de cloner le repository du projet sur votre machine, pensez bien à prendre tous les éléments de ce Github.

## Mise en place de la base de donnée
Pour garantir le bon fonctionement du projet, il est nécessaire de correctement installer la base de donnée.
Sur le SGBD choisi, il suffit d'utiliser les scripts de constrution de bdd et d'insertion de jeux de test:
```
- bdd-zooplanner-structure.sql
- bdd-zooplanner-données.sql
```
pour que la structure de la base de donnée soit automatiquement completée.

## Fonctionalités
L'application web est pour l'instant simpliste mais voici ces fonctionnalités:
- Différentes pages pour consulter des informations extraites de la base de données liées
- La possibilité de se connecter et de créer un utilisateur
- La différenciation entre utilisateur lambda et administrateur
- La possibilité de consulter l'enclopedie des annimaux
- La possibilité pour un administrateur de supprimer/modifier/ajouter des alertes, ainsi que d'ajouter des mission attribués à un utilisateur
- La crétion d'alerte par les utilisateurs


## Participants
Ce projet fut réalisé par:
- Mirocha Arnaud
- Guillot Gaspard
- Jardin Clément

### Si la moindre question ou proposition d'évolution du projet vous vient, vous pouvez me contacter à ces adresses:
- Sur github
- Par mail : arnaudmirocha@gmail.com
- Par discord : Purvanas#5674