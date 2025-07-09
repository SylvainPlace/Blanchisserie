import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(
    private router: Router,
    private configService: ConfigService
  ) {}

  navigateToLogin(): void {
    this.router.navigate([this.configService.getLoginRoute()]);
  }

  navigateToOrders(): void {
    this.router.navigate([this.configService.getOrdersRoute()]);
  }

  navigateToCreateOrder(): void {
    this.router.navigate([this.configService.getCreateOrderRoute()]);
  }

  navigateToAdminOrders(): void {
    this.router.navigate([this.configService.getAdminOrdersRoute()]);
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }

  isOnLoginPage(): boolean {
    return this.isCurrentRoute(this.configService.getLoginRoute());
  }

  isOnOrdersPage(): boolean {
    return this.isCurrentRoute(this.configService.getOrdersRoute());
  }

  isOnCreateOrderPage(): boolean {
    return this.isCurrentRoute(this.configService.getCreateOrderRoute());
  }

  isOnAdminOrdersPage(): boolean {
    return this.isCurrentRoute(this.configService.getAdminOrdersRoute());
  }

  goBack(): void {
    window.history.back();
  }

  navigateToUrl(url: string): void {
    this.router.navigate([url]);
  }

  navigateWithParams(route: string, params: { [key: string]: any }): void {
    this.router.navigate([route], { queryParams: params });
  }
}
