import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart } from './models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getShoppingCartByUserId(userId: number){
    return this.http.get<Cart[]>(this.baseUrl + `carts?userId=${userId}`);
  }

  addToShoppingCart(data: Cart){
    return this.http.post<Cart>(this.baseUrl + 'carts', data);
  }

  updateCart(id: number | string, data: Cart){
    return this.http.put(this.baseUrl + `carts/${id}`, data);
  }

  removeCart(id: number | string){
    return this.http.delete(this.baseUrl + `carts/${id}`);
  }
}
