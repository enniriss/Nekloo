# Sommaire

- [1/ Présentation du projet](#1/Présentation/du/projet)
- [2/ Gestion de Projet](#2/gestion/de/projet)
    - [Méthodes de travail](#m%C3%A9thodes/de/travail)
    - [Outils](#outils)
- [3/ Spécifications Fonctionnelles](#3/sp%C3%A9cifications/fonctionnelles)
	- [Responsivité](#Responsivité)
	- [Sécurité](#S%C3%A9curit%C3%A9)
	- [Vagabond](#Vagabond)
	- [Admin](#Admin)
	- [Place](#Place)
	- [Activity/Catégorie d'adresse](#Activity/Catégorie/d'adresse)
- [4/ Spécification Techniques](#4/sp%C3%A9cification/techniques)
    - [Architecture](#Architecture)
    - [Diagramme UML](#Diagramme/UML)
    - [Arborescence de fichier](#Arborescence/de/fichier)s
    - [Front-end](#Front-end)
        - [Maquettes](#Maquettes)
        - [Choix des technos ReactJS](#Choix/des/technos/ReactJS)
        - [FrameWork](#FrameWork)
    - [Back-end](#Back-end)
        - [Python](#Python)
        - [ORM](#ORM)
        - [Middleware](#Middleware)
        - [Sécurité](#S%C3%A9curit%C3%A9)
    - [Base de données](#Base/de/donn%C3%A9es)
        - [FireBase](#FireBase) 
- [5/ Développement de l'APP](#5/D%C3%A9veloppement/de/l%27APP)
- [6/ Déploiement](#6/D%C3%A9ploiement)
- [7/ Recherche et découverte](#7/Recherche/et/d%C3%A9couverte)
- [8/ Conclusion](#8/Conclusion)
# 1/ Présentation du projet
Nekloo est une application web qui a pour but de répertorier toutes les adresses de sorties niches. Afin de pouvoir improviser des sorties, tout en s'assurant de passer un bon moment. 

L'intérêt de cette application est de pouvoir mettre en valeur des adresses où l'on ne serait jamais allé.
L'avantage de ce modèle est de pouvoir encourager les utilisateurs à sortir et encourager les commerces locaux (restaurant, activités créatives, exposition temporaire...).

Cette application s'adresse plus particulièrement aux personnes qui aiment sortir sans se prendre la tête, à ceux qui souhaitant changer leur mode de consommation, en consommant dans des adresses locales, ou encore au touristes qui souhaitent découvrir une ville.
# 2/ Gestion de Projet

## Méthodes de travail
Pour ce projet j'ai travaillé avec la méthode KANBAN sur Trello, en triant mes tâches sous cinq catégories. "A faire", lorsqu'une tâche n'est pas effectué. "En cours", lorsque je travaille dessus. "Terminé", lorsque je l'ai effectué.  "En pause" lorsqu'une tâche e
Aussi chaque tâche peut comporter une ou plusieurs étiquette correspondant à la catégorie de travail correspondante.
![[Pasted image 20250421153107.png]]
**Etiquettes :**
>[!success] Hébergement

>[!question] BDD

> [!tip] Back-end

>[!error] Fron-end

>[!example] Présentation

>[!note] Branding
## Outils logiciels

| Logo                                         | Nom de l'outil    | Utilisation                                                                                                                       |
| -------------------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| ![[Pasted image 20250421125137.png\|40]]     | Trello            | Organiser ma liste de tâche, grâce à trois compartiment : A faire, En cours, Terminé                                              |
| ![[Pasted image 20250421125327.png\|40]]<br> | Github            | Pouvoir sauvegarder mon code tout en l'organisant. Cela me permet aussi de pouvoir partager mon projet à de futurs collaborateurs |
| ![[Pasted image 20250421125432.png\|40]]     | Firebase          | Déployer, Hébergé mon application que ce soit back ou front, tout en hébergeant un BDD performante et adapté à mes besoins        |
| ![[Pasted image 20250421125453.png\|40]]     | Figma             | Designer la maquette visuel de mon app, qui me permettra d'intégrer facilement mon app                                            |
| ![[Pasted image 20250421125514.png\|40]]     | VsCode            | Développer en toute simplicité, et avec des outils performants et des extensions pratiques.                                       |
| ![[Pasted image 20250421125537.png\|40]]     | Ionos             | Acheter mon DNS pour peut chère, avec des TLD intéressant comme (.com, .fr, .eu, .org)                                            |
| ![[Pasted image 20250510172908.png\|40]]     | Inifinite Painter | Créer mon logo et les éléments de décorations de mon site                                                                         |
## Langages et librairies
| Logo                                     | Nom            | Utilisation                                                                                         | Choix                                                                                              |
| ---------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| ![[Pasted image 20250611223505.png\|40]] | Python         | Créer mon serveur backend, qui me sert d'API pour le front et de moyen de communication pour la BDD | Exécution rapide, code simple et court.                                                            |
| ![[Pasted image 20250611223707.png\|40]] | React JS       | Créer le front de mon app                                                                           | Permet de construire son app de manière modulable et tout en y ajoutant une logique js facilement. |
|                                          | React Maplibre |                                                                                                     |                                                                                                    |
|                                          | Bootstrap      |                                                                                                     |                                                                                                    |
# 3/ Spécifications Fonctionnelles

## Enjeux
### Responsivité
Pour avoir une utilisation ergonomique, l'application doit être adaptée visuellement à n'importe quel type d'appareil, que ce soit sous format téléphone ou ordinateur.
### Sécurité
La sécurité est un enjeux essentiel pour la longévité d'une application. Il faut que les données sensibles soit au minimum crypté, et que l'accès à la base de donnée soit limité. 
### Vagabond
Un vagabond est l'équivalent d'un utilisateur. Il doit pouvoir créer un compte, se connecter, liker des adresses et pouvoir y aller. Il peut aussi créer une supposition d'adresse qui lui semble intéressante à rajouter sur l'application, qui sera ensuite vérifier par l'administrateur. Le vagabond doit pouvoir comprendre immédiatement le fonctionnement de l'application et être confortable avec la plateforme. 
### Admin
Le comptes admin doivent pouvoir ajouter des adresses, en modifier ou en supprimer. Il doit aussi être capable d'avoir accès aux suppositions d'adresses écrite par les utilisateurs, pour pouvoir vérifier les adresses pour les ajouter dans la bases de données.
### Place
Une "Place" est la traduction d'un endroit d'une adresse en anglais.
Les places doivent avoir des catégories d'activités défini, un nom et une adresse, au minimum.
### Activity/Catégorie d'adresse
L'activité est le rôle principal que joue l'établissement, par exemple un café, une exposition, un workspace, un évènement sportif ou musical.
Une catégorie d'adresse doit donc avoir un nom clair et explicite, avec une illustration correspondante sa signification.

- [ ] Poké ball
- [ ] Coffe Shop
- [ ] Exposition
- [ ] Restaurant avec des spécificités culturelles
- [ ] Lieux religieux
- [ ] Lieux/évènement sportif
- [ ] Friperies
- [ ] Lieux de calme / ou de travail
- [ ] Théâtre
- [ ] Cinéma
# 4/ Spécification Techniques

## Architecture

## Diagramme UML

![[Pasted image 20250510212713.png]]

**Explication du diagramme UML**
Le diagramme UML de classe présente la structure de donnée d'une application de répertoriage d'adresse. S'adressant à des utilisateurs.

**Classe User et Héritage:** Cette classe représente l'ensemble des utilisateur de l'application. La classe User est une classe abstraite qui fait hériter de ces caractéristiques à deux classes enfants.
- **User :** 
## Arborescence de fichier

## Front-end
### Maquettes
### Choix des technos ReactJS
### FrameWork
## Back-end
### Python
### ORM
### Middleware
### Sécurité
## Base de données
### FireBase
# 5/ Développement de l'APP
# 6/ Déploiement
# 7/ Recherche et découverte
# 8/ Conclusion

