import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  upload(file: File, id: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}upload?id=${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles() {
    return this.http.get(`${this.baseUrl}files`);
  }

  setMainPhoto(productId: number, photoId: number){
    return this.http.put(this.baseUrl + `items/set-main-photo?productId=${productId}&photoId=${photoId}`, {});
  }

  getPhotos(productId: number){
    return this.http.get<Product>(this.baseUrl + `items/${productId}`).pipe(map( data => {
      return data.photos;
    }));
  }

  deletePhoto(productId: number, photoId: number){
    return this.http.delete(this.baseUrl + `items/delete-photo?productId=${productId}&photoId=${photoId}`);
    
  }
}
