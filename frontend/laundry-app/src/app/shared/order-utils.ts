import { Order } from '../shared/models/order.model';

export function splitOrdersByDateAndStatus(orders: Order[]): { orders: Order[], pastOrders: Order[] } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = orders.filter(order => {
    const orderDate = new Date(order.date);
    orderDate.setHours(0, 0, 0, 0);
    return (orderDate >= today || order.status === 'Pending') && order.status !== 'Removed';
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = orders.filter(order => {
    const orderDate = new Date(order.date);
    orderDate.setHours(0, 0, 0, 0);
    return (orderDate < today && (order.status === 'Approved' || order.status === 'Rejected')) || order.status === 'Removed';
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { orders: upcoming, pastOrders: past };
}
