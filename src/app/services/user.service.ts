// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

// }
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  localStorageKey = 'threads_user';
  createUser(name: string) {
    return this.http.post<User>(`${environment.apiBaseUrl}/users`, {
      name,
    });
  }

  saveUserToStorage(user: User) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }

  getUserFromStorage() {
    const user = localStorage.getItem(this.localStorageKey);
    return user ? (JSON.parse(user) as User) : null;
  }
}
