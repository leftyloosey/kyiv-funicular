import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { RedirectCommand, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: String = '';

  authenticated = signal<boolean>(false);
  // authenticated: boolean = false;
  http = inject(HttpClient);
  router = inject(Router);
  user = inject(UserService);
  jwtKey = 'JWT';
  jwtValue = 'TRUE';

  getAuthentication(name: string, password: string) {
    let url = `${environment.apiBaseUrl}/users`;

    this.http.get<User[]>(url).subscribe((data) => {
      data.forEach((user) => {
        if (user.name === name && user.password === password) {
          this.saveJWT();
          this.authenticated.set(true);
          this.router.navigate(['/about']);
        } else {
          this.authenticated.set(false);
          this.router.navigate(['/relogin']);
        }
        return this.authenticated();
      });
    });
  }
  checkAuthentication() {
    const authy = this.getJWT();
    if (authy === 'TRUE') {
      this.authenticated.set(true);
      return this.authenticated();
    } else {
      this.authenticated.set(false);
      return this.authenticated();
    }
  }

  saveJWT() {
    localStorage.setItem(this.jwtKey, JSON.stringify(this.jwtValue));
  }

  getJWT() {
    const jwt = localStorage.getItem(this.jwtKey);
    return jwt ? (JSON.parse(jwt) as string) : null;
  }
}
