import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  sign_in(user) {
    return this.http.post('http://localhost:3000/users/sign-in', user);
  }

  login(user_login) {
    return this.http.post('http://localhost:3000/users/login', user_login);
  }

}
