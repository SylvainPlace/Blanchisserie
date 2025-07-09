import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { NotificationService } from './notification.service';
import { NavigationService } from './navigation.service';
import { AppConfig } from '../interfaces/config.interface';

@Injectable({
  providedIn: 'root'
})
export class AppUtilityService {
  constructor(
    private configService: ConfigService,
    private notificationService: NotificationService,
    private navigationService: NavigationService
  ) {}

  handleError(error: any, redirectToLogin: boolean = false): void {
    if (error.status === 401) {
      this.notificationService.showError('invalidCredentials');
      if (redirectToLogin) {
        this.navigationService.navigateToLogin();
      }
    } else if (error.status === 0 || error.status >= 500) {
      this.notificationService.showError('serverUnavailable');
    } else {
      this.notificationService.showError('generic');
    }
  }

  getApiUrl(endpoint: string, pathParams?: { [key: string]: string | number }): string {
    let url = this.configService.getApiUrl(endpoint);
    if (pathParams) {
      Object.keys(pathParams).forEach(key => {
        url = url.replace(`{${key}}`, String(pathParams[key]));
      });
    }
    return url;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR');
  }

  formatTime(date: Date): string {
    const format = this.configService.getTimeFormat();
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: format.includes('ss') ? '2-digit' : undefined
    });
  }

  isDevelopment(): boolean {
    return this.configService.isDevelopment();
  }

  devLog(message: string, data?: any): void {
    if (this.isDevelopment()) {
      console.log(`[${this.configService.getAppName()}] ${message}`, data);
    }
  }

  showSuccessAndNavigate(
    messageKey: keyof AppConfig['messages']['success'],
    navigateTo?: 'orders' | 'admin' | 'login' | 'createOrder'
  ): void {
    this.notificationService.showSuccess(messageKey);
    switch (navigateTo) {
      case 'orders':
        this.navigationService.navigateToOrders();
        break;
      case 'admin':
        this.navigationService.navigateToAdminOrders();
        break;
      case 'login':
        this.navigationService.navigateToLogin();
        break;
      case 'createOrder':
        this.navigationService.navigateToCreateOrder();
        break;
    }
  }
}
