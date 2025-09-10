// import { HttpClient } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// // import { User } from '../../utils/interfaces/user';
// import { environment } from '../../environments/environments';
// import { AuthService } from '../auth-service/auth.service';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private http = inject(HttpClient);
//   private auth = inject(AuthService);
//   private router = inject(Router);

//   public createUser(name: string, password: string) {
//     this.http
//       .post<User>(`${environment.apiBaseUrl}/users`, {
//         name: name,
//         password: password,
//       })
//       .subscribe(() => console.log(`${name} + ${password}`));
//     this.auth.getTokenFromBackend(name, password);
//     this.router.navigate(['/redirector']);
//   }
//   public loginUser(name: string, password: string) {
//     this.auth.getTokenFromBackend(name, password).subscribe({
//       error: (err) => console.log(err),
//       complete: () => {
//         this.router.navigate(['/profile']);
//       },
//     });
//   }
// }
