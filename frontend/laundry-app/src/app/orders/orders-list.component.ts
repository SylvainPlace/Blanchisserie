import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Order } from '../shared/models/order.model';
import { OrdersTableComponent } from '../shared/components/orders-table/orders-table.component';
import { OrderDetailsDialogComponent } from '../shared/components/order-details-dialog/order-details-dialog.component';
import { SharedHeaderComponent } from '../shared/components/shared-header/shared-header.component';
import { splitOrdersByDateAndStatus } from '../shared/order-utils';
import { NotificationService } from '../services/notification.service';
import { NavigationService } from '../services/navigation.service';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ToastModule,
    TabViewModule,
    OrdersTableComponent,
    OrderDetailsDialogComponent,
    SharedHeaderComponent
  ],
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  pastOrders: Order[] = [];
  loading = false;
  displayDialog = false;
  selectedOrder: Order | null = null;
  isAdmin = false;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private navigationService: NavigationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        const { orders: upcoming, pastOrders: past } = splitOrdersByDateAndStatus(orders);
        this.orders = upcoming;
        this.pastOrders = past;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.showError('loadOrders');
      }
    });
  }

  navigateToCreateOrder(): void {
    this.navigationService.navigateToCreateOrder();
  }

  viewOrder(order: Order): void {
    this.selectedOrder = order;
    this.displayDialog = true;
  }

  removeOrder(order: Order): void {
    if (!order) return;
    this.orderService.removeOrder(order.id).subscribe({
      next: () => {
        this.loadOrders();
        this.notificationService.showSuccess('orderDeleted');
      },
      error: () => {
        this.notificationService.showError('orderDelete');
      }
    });
  }

  navigateToAdminOrders(): void {
    this.navigationService.navigateToAdminOrders();
  }
}
