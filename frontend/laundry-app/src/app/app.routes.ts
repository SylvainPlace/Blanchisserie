import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { authGuard } from './auth/auth.guard';
import { adminGuard } from './auth/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'orders', 
    loadComponent: () => import('./orders/orders-list.component').then(m => m.OrdersListComponent),
    canActivate: [authGuard] 
  },
  { 
    path: 'orders/create', 
    loadComponent: () => import('./orders/create-order.component').then(m => m.CreateOrderComponent),
    canActivate: [authGuard] 
  },
  { 
    path: 'admin', 
    loadComponent: () => import('./admin/admin-orders.component').then(m => m.AdminOrdersComponent),
    canActivate: [authGuard, adminGuard] 
  },
  { path: '**', redirectTo: '/login' }
];
