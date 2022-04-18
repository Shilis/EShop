import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from './models/order';
import { OrderDetails } from './models/orderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addOrder(data: Order){
    return this.http.post<Order>(this.baseUrl + 'orders', data);
  }

  addOrderDetails(data: OrderDetails){
    this.http.post<OrderDetails>(this.baseUrl + 'orderDetails', data).subscribe();
  }

  getUserOrders(userId: number){
    return this.http.get<Order[]>(this.baseUrl + `orders/users?userId=${userId}`);
  }

  getOrders(){
    return this.http.get<Order[]>(this.baseUrl + `orders`);
  }

  getOrderDetails(orderId: number){
    return this.http.get<OrderDetails[]>(this.baseUrl + `orderDetails?orderID=${orderId}`);
  }

  updateOrder(id: number | string, data: Order){
    return this.http.put(this.baseUrl + `orders/${id}`, data);
  }
}
