import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environments';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { userNameSignal } from '../signals';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  auth = inject(AuthService);
  router = inject(Router);
  createUser(name: string) {
    return this.http.post<User>(`${environment.apiBaseUrl}/users`, {
      name,
    });
  }
  loginUser(name: string, password: string) {
    this.auth.acquireJWT(name, password);

    this.router.navigate(['/redirector']);
  }
}
