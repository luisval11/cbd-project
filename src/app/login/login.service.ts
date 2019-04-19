import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public eventEmitter: EventEmitter<User> = new EventEmitter<User>();
  public principal: User;

  constructor(private http: HttpClient) { }

  storeToken(user: User) {

    const username = user.username;
    const pass = user.password;
    const basicToken = btoa(username + ':' + pass);

    const headers_object = new HttpHeaders().set('Authorization', 'Basic ' + basicToken);
    return this.http.get('/api/login', { headers: headers_object }).toPromise()
      .then(token => {
        this.getPrincipal().then(user => {
          this.principal = user;
          this.eventEmitter.emit(this.principal);
        });
      });
  }

  logout() {
    const res = this.http.get('/api/logout').toPromise();
    res.then(token => {
      this.principal = null;
      this.eventEmitter.emit(null);
    });
    return res;
  }

  getPrincipal() {
    const query = this.http.get<User>('/api/getPrincipal').toPromise();
    query.then(user => {
      this.principal = user;
    });
    return query;
  }

}

