import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  create_user(user: User) {
    return this.http.post('http://localhost:3000/users/sign-in', user);
  }

  log_user(user_login: User) {
    return this.http.post('http://localhost:3000/users/login', user_login);
  }

  get_users() {
    return this.http.get('http://localhost:3000/users');
  }
  
  get_user(id: string) {
    return this.http.get(`http://localhost:3000/users/${id}`);
  }

}
