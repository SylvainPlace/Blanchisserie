import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { OrdersListComponent } from './orders/orders-list.component';
import { CreateOrderComponent } from './orders/create-order.component';
import { AdminOrdersComponent } from './admin/admin-orders.component';
import { authGuard } from './auth/auth.guard';
import { adminGuard } from './auth/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'orders', 
    component: OrdersListComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'orders/create', 
    component: CreateOrderComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'admin', 
    component: AdminOrdersComponent, 
    canActivate: [authGuard, adminGuard] 
  },
  { path: '**', redirectTo: '/login' }
];
