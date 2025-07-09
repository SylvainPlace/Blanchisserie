import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order.model';

// PrimeNG imports
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-order-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    TagModule
  ],
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.scss']
})
export class OrderDetailsDialogComponent {
  @Input() visible = false;
  @Input() order: Order | null = null;
  @Input() showUserName = false;
  @Input() showAdminActions = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() approveOrder = new EventEmitter<Order>();
  @Output() rejectOrder = new EventEmitter<Order>();

  get dialogHeader(): string {
    return `Détails de la commande #${this.order?.id || ''}`;
  }

  onHide(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onApprove(): void {
    if (this.order) {
      this.approveOrder.emit(this.order);
    }
  }

  onReject(): void {
    if (this.order) {
      this.rejectOrder.emit(this.order);
    }
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
}
