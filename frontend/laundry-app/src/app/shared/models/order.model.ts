export interface Order {
  id: number;
  date: Date;
  name: string;
  articles: OrderArticle[];
  reason?: string;
  comment?: string;
  adminComment?: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Removed';
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderArticle {
  name: string;
  quantity: number;
}

export interface CreateOrderRequest {
  date: Date;
  articles: OrderArticle[];
  motif?: string;
  commentaire?: string;
}

export interface UpdateOrderStatusRequest {
  orderId: number;
  status: 'Approved' | 'Rejected' | 'Removed';
  adminComment?: string;
}
