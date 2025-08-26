# Gestionnaire de Bibliothèque (en Rust)

Ce programme permet de gérer une petite bibliothèque en ligne de commande. Il permet d'ajouter, emprunter, retourner et afficher des livres.

---

## Structure principale

`struct Livre`
Définit un livre avec les champs suivants :
- `titre: String`
- `auteur: String`
- `annee: i32`
- `disponible: bool`

---

## Fonctions utilitaires

### `inputing_string(param: String) -> String`
Demande une chaîne de caractères à l'utilisateur.

### `inputing_number(param: String) -> i32`
Demande un nombre à l'utilisateur, avec vérification.

---

## Fonctions liées aux livres

### `ajouter_livre(...)`
Ajoute un nouveau livre si son titre n'existe pas déjà dans la collection.

### `afficher_livres(...)`
Affiche tous les livres enregistrés.

### `afficher_livres_a_emprunter(...)`
Affiche uniquement les livres disponibles à l'emprunt.

### `empreinter_livre(titre, livres)`
Marque un livre comme non disponible s’il est trouvé et disponible.

### `retourner_livre(titre, livres)`
Marque un livre comme disponible s’il est actuellement emprunté.

---

## Boucle principale (`main`)

Le programme propose un menu :
1. Ajouter un livre
2. Emprunter un livre
3. Retourner un livre
4. Afficher tous les livres
5. Afficher les livres disponibles
6. Quitter

Chaque action appelle les fonctions correspondantes pour modifier ou consulter la liste des livres.

---

## ✅ Exemple d'utilisation

```text
1. Ajouter un livre
2. Empreinter un livre
3. Retourner un livre
4. Afficher tous les livres
5. Afficher tous les livres disponible
6. Quitter le programme
