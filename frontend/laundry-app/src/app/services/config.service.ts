import { Injectable } from '@angular/core';
import { AppConfig } from '../interfaces/config.interface';
import { APP_CONFIG } from '../shared/config/app.config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AppConfig = APP_CONFIG;

  // API Configuration
  getApiBaseUrl(): string {
    return this.config.api.baseUrl;
  }

  getApiUrl(endpoint: string): string {
    return `${this.config.api.baseUrl}${endpoint}`;
  }

  getAuthLoginUrl(): string {
    return this.getApiUrl(this.config.api.auth.login);
  }

  getOrdersUrl(): string {
    return this.getApiUrl(this.config.api.orders.base);
  }

  getOrderByIdUrl(id: number): string {
    return this.getApiUrl(this.config.api.orders.byId.replace('{id}', id.toString()));
  }

  getAdminOrdersUrl(): string {
    return this.getApiUrl(this.config.api.admin.orders);
  }

  getAdminOrderByIdUrl(id: number): string {
    return this.getApiUrl(this.config.api.admin.orderById.replace('{id}', id.toString()));
  }

  getValidateOrderUrl(id: number): string {
    return this.getApiUrl(this.config.api.admin.validate.replace('{id}', id.toString()));
  }

  getRejectOrderUrl(id: number): string {
    return this.getApiUrl(this.config.api.admin.reject.replace('{id}', id.toString()));
  }

  // Route Configuration
  getLoginRoute(): string {
    return this.config.routes.login;
  }

  getOrdersRoute(): string {
    return this.config.routes.orders.list;
  }

  getCreateOrderRoute(): string {
    return this.config.routes.orders.create;
  }

  getAdminOrdersRoute(): string {
    return this.config.routes.admin.orders;
  }

  // Message Configuration
  getSuccessMessage(key: keyof AppConfig['messages']['success']): string {
    return this.config.messages.success[key];
  }

  getErrorMessage(key: keyof AppConfig['messages']['error']): string {
    return this.config.messages.error[key];
  }

  getInfoMessage(key: keyof AppConfig['messages']['info']): string {
    return this.config.messages.info[key];
  }

  // UI Config
  getToastDuration(): number {
    return this.config.ui.toastDuration;
  }

  // App Config
  getAppName(): string {
    return this.config.app.name;
  }

  getDateFormat(): string {
    return this.config.ui.dateFormat;
  }

  getTimeFormat(): string {
    return this.config.ui.timeFormat;
  }

  isDevelopment(): boolean {
    return this.config.app.environment === 'development';
  }
}
