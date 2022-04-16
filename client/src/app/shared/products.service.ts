import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from './models/pagination';
import { Product } from './models/product';
import { ProductParams } from './models/productParams';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  paginatedResult: PaginatedResult<Product[]> = new PaginatedResult<Product[]>();

  readonly productAPIUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(productParams: ProductParams) {
    let params = this.getPaginationHeaders(productParams.pageNumber, productParams.pageSize);


    params = params.append('minPrice', productParams.minPrice.toString());
    params = params.append('maxPrice', productParams.maxPrice.toString());
    params = params.append('orderBy', productParams.orderBy);
    if(productParams.categoryId !== null) params = params.append('categoryId', productParams.categoryId.toString());

    return this.http.get<Product[]>(this.productAPIUrl + 'items', {observe: 'response', params}).pipe(
      map( response => {
        this.paginatedResult.results = response.body;
        if(response.headers.get('Pagination') !== null){
          this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }
        return this.paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number){
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }

  getProductsDefault(){
    return this.http.get<Product[]>(this.productAPIUrl + 'items');
  }

  getproduct(id: number | string) {
    return this.http.get<Product>(this.productAPIUrl + `items/${id}`);
  }

  addProduct(data: Product) {
    return this.http.post(this.productAPIUrl + 'items', data);
  }

  updateProduct(id: number | string, data: Product){
    return this.http.put(this.productAPIUrl + `items/${id}`, data);
  }

  deleteProduct(id: number | string) {
    return this.http.delete(this.productAPIUrl + `items/${id}`);
  }

}
