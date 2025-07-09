import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order.model';

// PrimeNG imports
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule, TooltipModule],
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
})
export class OrdersTableComponent {
  @Input() orders: Order[] = [];
  @Input() loading = false;
  @Input() showClientColumn = false;
  @Input() showAdminActions = false;
  @Input() emptyMessage = 'Aucune commande trouvée';
  @Input() emptyDescription = 'Aucune commande disponible';

  @Output() viewOrder = new EventEmitter<Order>();
  @Output() approveOrder = new EventEmitter<Order>();
  @Output() rejectOrder = new EventEmitter<Order>();
  @Output() removeOrder = new EventEmitter<Order>();

  onViewOrder(order: Order): void {
    this.viewOrder.emit(order);
  }

  onApproveOrder(order: Order): void {
    this.approveOrder.emit(order);
  }

  onRejectOrder(order: Order): void {
    this.rejectOrder.emit(order);
  }

  onRemoveOrder(order: Order): void {
    this.removeOrder.emit(order);
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'Pending':
        return 'En attente';
      case 'Approved':
        return 'Approuvée';
      case 'Rejected':
        return 'Refusée';
      case 'Removed':
        return 'Supprimée';
      default:
        return status;
    }
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'danger' | 'info' {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'danger';
      case 'Removed':
        return 'info';
      default:
        return 'info';
    }
  }

  getTotalArticles(order: Order): number {
    return order.articles?.reduce((sum, article) => sum + (article.quantity || 1), 0) || 0;
  }
}
