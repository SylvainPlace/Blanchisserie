# README - Application de Gestion de Blanchisserie

## Présentation métier

Cette application web permet de gérer les commandes de blanchisserie pour les utilisateurs et les administrateurs.

## Fonctionnalités principales

L'application se compose de 4 écrans principaux :

### 1. Écran de connexion (Login)

- Permet à l'utilisateur ou à l'administrateur de s'authentifier.
- L'accès aux autres fonctionnalités dépend du rôle de l'utilisateur.

### 2. Liste des commandes utilisateur

- Accessible à tous les utilisateurs
- Affiche à l'utilisateur la liste de ses propres commandes de blanchisserie.
- Permet de consulter le statut de chaque commande (en attente, en cours, terminée, etc.).

### 3. Liste des commandes admin

- Accessible uniquement aux administrateurs.
- Affiche la liste de toutes les commandes de tous les utilisateurs.
- Permet de gérer, suivre et mettre à jour le statut des commandes.

### 4. Nouvelle commande

- Accessible depuis la liste des commandes utilisateur
- Permet à l'utilisateur de créer une nouvelle commande de blanchisserie.
- Saisie des informations nécessaires (type de linge, quantité, instructions, etc.).

## Organisation de la liste des commandes

La liste des commandes est triée en deux onglets :

- **Commandes actuelles** : inclut les commandes dont la date est au plus tôt aujourd’hui et dont le statut n’est pas « supprimé ».
- **Historique** : inclut les commandes dont la date est au plus tard hier ou dont le statut est « supprimé ».

## Actions possibles selon le rôle

### Utilisateur

- Créer une nouvelle commande de blanchisserie
- Consulter la liste de ses propres commandes
- Voir le détail et le statut de chaqu'une de ses commandes
- Annuler (supprimer) une commande en attente

### Administrateur

- Consulter la liste de toutes les commandes de tous les utilisateurs
- Voir le détail de chaque commande
- Approuver ou refuser une commande en attente
- Mettre à jour le statut d’une commande (en cours, acceptée, refusée)
