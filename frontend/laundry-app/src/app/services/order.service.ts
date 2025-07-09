import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, CreateOrderRequest } from '../shared/models/order.model';
import { AuthService } from './auth.service';
import { ConfigService } from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  createOrder(orderRequest: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(this.configService.getOrdersUrl(), orderRequest);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.configService.getOrdersUrl());
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(this.configService.getOrderByIdUrl(id));
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(this.configService.getOrderByIdUrl(id));
  }

  removeOrder(id: number): Observable<void> {
    return this.deleteOrder(id);
  }

  // ADMIN ENDPOINTS
  getAllOrdersForAdmin(): Observable<Order[]> {
    return this.http.get<Order[]>(this.configService.getAdminOrdersUrl());
  }

  getOrderByIdForAdmin(id: number): Observable<Order> {
    return this.http.get<Order>(this.configService.getAdminOrderByIdUrl(id));
  }

  validateOrder(id: number): Observable<void> {
    return this.http.put<void>(this.configService.getValidateOrderUrl(id), {});
  }

  rejectOrder(id: number, adminComment?: string): Observable<void> {
    const body = adminComment ? { adminComment } : {};
    return this.http.put<void>(this.configService.getRejectOrderUrl(id), body);
  }
}
