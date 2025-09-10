// import { inject, Injectable, OnInit, signal } from '@angular/core';
// import { User } from '../../utils/interfaces/user';
// import { environment } from '../../environments/environments';
// import { HttpClient } from '@angular/common/http';
// import { Token } from '../../utils/classes/token';
// import { map } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';
// import { userNameSignal } from '../../utils/signals';
// import { Router } from '@angular/router';
// import { createLinkedSignal } from '@angular/core/primitives/signals';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private token: Token = new Token('');
//   private router = inject(Router);
//   private http = inject(HttpClient);
//   private cookieService = inject(CookieService);

//   constructor() {
//     this.token = new Token(this.getTokenFromService());
//   }

//   private setUserNameSignal(name: string) {
//     userNameSignal.set(name);
//   }

//   public getUserId(): string {
//     return this.token.getUserId();
//   }

//   public logout() {
//     this.cookieService.delete('token');
//     this.setUserNameSignal('');

//     if (this.router.url == '/home') window.location.reload();
//     this.router.navigate(['/home']);
//     this.isAuthenticated();
//   }

//   public getTokenFromBackend(name: string, password: string) {
//     let url = `${environment.apiBaseUrl}/auth/login`;

//     return this.http.post<User>(url, { name, password }).pipe(
//       map((response: any) => {
//         if (response.access_token) {
//           this.cookieService.set('token', response.access_token);
//           this.token = new Token(this.getTokenFromService());
//         }
//         return response;
//       })
//     );
//   }

//   public isAuthenticated(): boolean {
//     return this.cookieService.check('token') && !this.token.isExpired();
//   }

//   private getTokenFromService(): string {
//     const value = this.cookieService.get('token');
//     return value;
//   }
// }
