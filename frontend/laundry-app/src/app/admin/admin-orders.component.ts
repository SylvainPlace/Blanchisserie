import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';
import { Order } from '../shared/models/order.model';
import { OrdersTableComponent } from '../shared/components/orders-table/orders-table.component';
import { OrderDetailsDialogComponent } from '../shared/components/order-details-dialog/order-details-dialog.component';
import { RejectOrderDialogComponent } from '../shared/components/reject-order-dialog/reject-order-dialog.component';
import { SharedHeaderComponent } from '../shared/components/shared-header/shared-header.component';
import { splitOrdersByDateAndStatus } from '../shared/order-utils';
import { NotificationService } from '../services/notification.service';
import { NavigationService } from '../services/navigation.service';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    TabViewModule,
    OrdersTableComponent,
    OrderDetailsDialogComponent,
    RejectOrderDialogComponent,
    SharedHeaderComponent
  ],
  providers: [ConfirmationService],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  pastOrders: Order[] = [];
  loading = false;
  displayDialog = false;
  displayRejectDialog = false;
  selectedOrder: Order | null = null;
  orderToReject: Order | null = null;
  today = new Date();

  constructor(
    private orderService: OrderService,
    private navigationService: NavigationService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadAllOrders();
  }

  loadAllOrders(): void {
    this.loading = true;
    this.orderService.getAllOrdersForAdmin().subscribe({
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

  viewOrder(order: Order): void {
    // Recharge la commande depuis l'API admin pour avoir les infos à jour
    this.orderService.getOrderByIdForAdmin(order.id).subscribe({
      next: (freshOrder) => {
        this.selectedOrder = freshOrder;
        this.displayDialog = true;
      },
      error: () => {
        this.notificationService.showError('loadOrder');
      }
    });
  }

  approveOrder(order: Order): void {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir approuver la commande #${order.id} de ${order.name} ?`,
      header: 'Confirmation d\'approbation',
      icon: 'pi pi-check-square',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this.orderService.validateOrder(order.id).subscribe({
          next: () => {
            this.handleCorrectOrderUpdate(order);
          },
          error: () => {
            this.handleErrorOrderUpdate();
          }
        });
      }
    });
  }

  rejectOrder(order: Order): void {
    this.orderToReject = order;
    this.displayRejectDialog = true;
  }

  confirmRejectOrder(event: {order: Order, comment: string}): void {
    this.orderService.rejectOrder(event.order.id, event.comment || undefined).subscribe({
      next: () => {
        this.handleCorrectOrderUpdate(event.order);
        this.displayRejectDialog = false;
        this.orderToReject = null;
      },
      error: () => {
        this.handleErrorOrderUpdate();
        this.displayRejectDialog = false;
        this.orderToReject = null;
      }
    });
  }

    private handleCorrectOrderUpdate(order: Order) {
    this.refreshOrderInList(order.id);
    this.loadAllOrders();
    this.notificationService.showSuccess('orderApproved');
  }

  private handleErrorOrderUpdate() {
    this.notificationService.showError('orderAction');
  }

  private refreshOrderInList(orderId: number) {
    // Recharge la commande depuis l'API admin pour avoir l'état à jour
    this.orderService.getOrderByIdForAdmin(orderId).subscribe({
      next: (updatedOrder) => {
        const index = this.orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
        }
        if (this.selectedOrder && this.selectedOrder.id === orderId) {
          this.selectedOrder = updatedOrder;
        }
      }
    });
  }

  navigateToClientOrders(): void {
    this.navigationService.navigateToOrders();
  }
}
