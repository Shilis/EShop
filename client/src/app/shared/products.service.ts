import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly productAPIUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.productAPIUrl + 'items');
  }

  getproduct(id: number | string) {
    return this.http.get<Product>(this.productAPIUrl + `items/${id}`);
  }
}
