import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  readonly baseUrl = environment.apiUrl;

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post(this.baseUrl + 'accounts/login', model).pipe(
      map((response: User) => {
        const user = response;
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'accounts/register', model).pipe(
      map((user: User) => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user: User){
    if(user){
      const role = this.getDecodedToken(user.token).role;
      const id = this.getDecodedToken(user.token).certserialnumber;
      user.role = role;
      user.id = id;
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSource.next(user);
    }
    
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getUsers(){
    return this.http.get(this.baseUrl + 'users');
  }

  getDecodedToken(token){
    return JSON.parse(atob(token.split('.')[1]));
  }

}
