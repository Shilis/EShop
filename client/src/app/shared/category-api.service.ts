import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../category/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {
  readonly categoryAPIUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCategoryList() {
    return this.http.get<Category[]>(this.categoryAPIUrl + 'categories')
  }

  addCategory(data: Category) {
    return this.http.post(this.categoryAPIUrl + 'categories', data);
  }

  updateCategory(id: number | string, data: Category) {
    return this.http.put(this.categoryAPIUrl + `categories/${id}`, data);
  }

  deleteCategory(id: number | string) {
    return this.http.delete(this.categoryAPIUrl + `categories/${id}`);
  }

  getSubCategoryList() {
    return this.http.get<any>(this.categoryAPIUrl + 'subCategories')
  }

  getSubCategoryListOfCategory(categoryId: number){
    return this.http.get<any>(this.categoryAPIUrl + `subCategories/${categoryId}/categories`);
  }

  addSubCategory(data: any) {
    return this.http.post(this.categoryAPIUrl + 'subCategories', data);
  }

  updateSubCategory(id: number | string, data: any) {
    return this.http.put(this.categoryAPIUrl + `subCategories/${id}`, data);
  }

  deleteSubCategory(id: number | string) {
    return this.http.delete(this.categoryAPIUrl + `subCategories/${id}`);
  }
}
