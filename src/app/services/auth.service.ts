import { inject, Injectable, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';

import { Token } from '../classes/token';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: Token = new Token(this.feedToken());
  http = inject(HttpClient);

  whereTo: string = '';

  acquireJWT(name: string, password: string) {
    let url = `${environment.apiBaseUrl}/auth/login`;

    this.http.post<User>(url, { name, password }).subscribe((data) => {
      this.token = new Token(data);
    });
  }
  isAuthenticated(): boolean {
    if (!this.token.isExpired()) return true;
    return false;
  }

  feedToken() {
    try {
      const key = Token.getJwtKey() as string;
      const exists = this.getJWT(key);
      let data;
      if (exists) {
        data = JSON.parse(exists);
        return data;
      }
      return {};
    } catch (error) {
      console.log(error);
    }
  }

  getJWT(key: string) {
    return localStorage.getItem(key);
  }
}
