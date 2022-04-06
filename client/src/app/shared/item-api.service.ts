import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Item } from '../items/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemApiService {
  readonly productAPIUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getItemList() {
    return this.http.get<Item[]>(this.productAPIUrl + 'items');
  }

  getItem(id: number | string) {
    return this.http.get<Item>(this.productAPIUrl + `items/${id}`);
  }

}
