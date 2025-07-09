import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '../../models/order.model';

// PrimeNG imports
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Textarea } from 'primeng/textarea';

@Component({
  selector: 'app-reject-order-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    Textarea
  ],
  templateUrl: './reject-order-dialog.component.html',
  styleUrls: ['./reject-order-dialog.component.scss']
})
export class RejectOrderDialogComponent {
  @Input() visible = false;
  @Input() order: Order | null = null;
  
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() confirmReject = new EventEmitter<{order: Order, comment: string}>();
  
  rejectionComment = '';
  
  get dialogHeader(): string {
    return `Refuser la commande #${this.order?.id || ''}`;
  }
  
  onHide(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.rejectionComment = '';
  }
  
  onConfirm(): void {
    if (this.order) {
      this.confirmReject.emit({
        order: this.order,
        comment: this.rejectionComment.trim()
      });
      this.onHide();
    }
  }
  
  onCancel(): void {
    this.onHide();
  }
}
