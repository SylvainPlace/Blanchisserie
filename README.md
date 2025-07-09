# Test Technique

Ce projet est une application web sécurisée pour la gestion des commandes de blanchisserie, réalisée dans le cadre d’un test technique.

## Objectif

Développer une application permettant aux utilisateurs de passer des commandes de blanchisserie en ligne, et aux administrateurs de valider ou refuser ces commandes, avec un suivi des commandes passées.

## Technologies utilisées

- **Frontend** :
  - Angular : 19.2.0
  - PrimeNG : 19.1.3
  - PrimeFlex : 4.0.0
  - PrimeIcons : 7.0.0
- **Backend** :
  - .NET : net9.0
  - EntityFrameworkCore.InMemory : 9.0.6
  - BCrypt.Net-Next : 4.0.3
  - Microsoft.AspNetCore.Authentication.JwtBearer : 9.0.6
  - Microsoft.AspNetCore.OpenApi : 9.0.6
  - Serilog : 4.3.0
  - Swashbuckle.AspNetCore : 9.0.1

## Fonctionnalités principales

L'application se compose de 4 écrans principaux :

### 1. Écran de connexion (Login)

- Authentification utilisateur/admin
- L'accès aux fonctionnalités dépend du rôle

### 2. Liste des commandes utilisateur

- Affichage de la liste des commandes de l'utilisateur connecté
- Consultation du statut de chaque commande (en attente, en cours, terminée, etc.)

### 3. Liste des commandes admin

- Accessible uniquement aux administrateurs
- Affichage de toutes les commandes de tous les utilisateurs
- Gestion, suivi et mise à jour du statut des commandes

### 4. Nouvelle commande

- Création d'une nouvelle commande de blanchisserie
- Saisie des informations nécessaires (type de linge, quantité, instructions, etc.)

## Organisation de la liste des commandes

- **Commandes actuelles** : commandes dont la date est au plus tôt aujourd’hui et statut différent de « supprimé »
- **Historique** : commandes dont la date est au plus tard hier ou statut « supprimé »

## Actions possibles selon le rôle

### Utilisateur

- Créer une nouvelle commande
- Consulter la liste de ses commandes
- Voir le détail et le statut de chaque commande
- Annuler (supprimer) une commande en attente

### Administrateur

- Consulter la liste de toutes les commandes
- Voir le détail de chaque commande
- Approuver ou refuser une commande en attente
- Mettre à jour le statut d’une commande (en cours, acceptée, refusée)

## Structure du projet

- `frontend/` : Application Angular (PrimeNG)
- `backend/` : API .NET Core (C#)

## Lancement du projet

### Backend

1. Ouvrir le dossier `backend/LaundryAPI/`
2. Restaurer les dépendances NuGet
3. Lancer l’API :

   ```powershell
   dotnet run --project LaundryAPI/LaundryAPI.csproj
   ```

### Frontend

1. Ouvrir le dossier `frontend/laundry-app/`
2. Installer les dépendances :

   ```powershell
   npm install
   ```

3. Lancer l’application :

   ```powershell
   ng serve
   ```

---

**Auteur :** Sylvain Place
**Date :** Juillet 2025
