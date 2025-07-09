export interface ApiConfig {
  baseUrl: string;
  auth: {
    login: string;
  };
  orders: {
    base: string;
    user: string;
    byId: string;
  };
  admin: {
    orders: string;
    orderById: string;
    validate: string;
    reject: string;
  };
}

export interface RouteConfig {
  login: string;
  orders: {
    list: string;
    create: string;
  };
  admin: {
    orders: string;
  };
}

export interface MessageConfig {
  success: {
    orderCreated: string;
    orderApproved: string;
    orderRejected: string;
    orderDeleted: string;
  };
  error: {
    generic: string;
    loadOrders: string;
    loadOrder: string;
    invalidCredentials: string;
    serverUnavailable: string;
    orderAction: string;
    orderDelete: string;
  };
  info: {
    noOrders: string;
  };
}

export interface AppConfig {
  api: ApiConfig;
  routes: RouteConfig;
  messages: MessageConfig;
  app: {
    name: string;
    version: string;
    environment: 'development' | 'production';
  };
  ui: {
    defaultPageSize: number;
    toastDuration: number;
    dateFormat: string;
    timeFormat: string;
  };
}
