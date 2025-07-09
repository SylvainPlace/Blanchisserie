import { AppConfig } from '../../interfaces/config.interface';

export const APP_CONFIG: AppConfig = {
  api: {
    baseUrl: 'http://localhost:5000/api',
    auth: {
      login: '/auth/login'
    },
    orders: {
      base: '/orders',
      user: '/orders/user',
      byId: '/orders/{id}'
    },
    admin: {
      orders: '/admin/orders',
      orderById: '/admin/orders/{id}',
      validate: '/admin/orders/{id}/validate',
      reject: '/admin/orders/{id}/reject'
    }
  },
  routes: {
    login: '/login',
    orders: {
      list: '/orders',
      create: '/orders/create'
    },
    admin: {
      orders: '/admin'
    }
  },
  messages: {
    success: {
      orderCreated: 'Commande créée avec succès',
      orderApproved: 'Commande approuvée avec succès',
      orderRejected: 'Commande rejetée avec succès',
      orderDeleted: 'Commande supprimée avec succès'
    },
    error: {
      generic: 'Une erreur est survenue',
      loadOrders: 'Erreur lors du chargement des commandes',
      loadOrder: 'Impossible de charger la commande',
      invalidCredentials: 'Email ou mot de passe incorrect',
      serverUnavailable: 'Serveur inaccessible. Veuillez réessayer plus tard.',
      orderAction: 'Erreur lors de l\'action sur la commande',
      orderDelete: 'Erreur lors de la suppression de la commande'
    },
    info: {
      noOrders: 'Aucune commande trouvée'
    }
  },
  app: {
    name: 'Laundry App',
    version: '1.0.0',
    environment: 'development'
  },
  ui: {
    defaultPageSize: 10,
    toastDuration: 3000,
    dateFormat: 'dd/MM/yyyy',
    timeFormat: 'HH:mm'
  }
};
