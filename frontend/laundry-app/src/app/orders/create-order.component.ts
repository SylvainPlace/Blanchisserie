import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { OrderService } from '../services/order.service';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { NavigationService } from '../services/navigation.service';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    InputNumberModule,
    ToastModule,
    RouterLink,
    FloatLabelModule,
  ],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent {
  orderForm: FormGroup;
  loading = false;
  today: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private navigationService: NavigationService,
    private notificationService: NotificationService
  ) {
    this.orderForm = this.fb.group({
      articles: this.fb.array([this.createArticleGroup()]),
      date: ['', Validators.required],
      reason: [''],
      comment: [''],
    });
  }

  get articles(): FormArray {
    return this.orderForm.get('articles') as FormArray;
  }

  createArticleGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  addArticle(): void {
    this.articles.push(this.createArticleGroup());
  }

  removeArticle(index: number): void {
    if (this.articles.length > 1) {
      this.articles.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.loading = true;

      const formValue = this.orderForm.value;
      const orderRequest = {
        ...formValue,
      };

      this.orderService.createOrder(orderRequest).subscribe({
        next: (response) => {
          this.loading = false;
          this.notificationService.showSuccess('orderCreated');

          setTimeout(() => {
            this.navigationService.navigateToOrders();
          }, 500);
        },
        error: (error) => {
          this.loading = false;
          this.notificationService.showError('generic');
        },
      });
    }
  }
}
