// import { Component, inject } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { LoginUser } from '../../utils/classes/login';
// import { UserService } from '../../services/user-service/user.service';
// import { AuthService } from '../../services/auth-service/auth.service';

// @Component({
//   selector: 'app-login',
//   imports: [FormsModule],
//   templateUrl: './login.html',
//   styleUrl: './login.scss',
// })
// export class Login {
//   private userService = inject(UserService);
//   private auth = inject(AuthService);
//   protected loginMode: boolean = true;
//   protected submitted: boolean = false;
//   protected model = new LoginUser('', '');

//   protected submitLoginForm(form: NgForm) {
//     if (this.loginMode) {
//       this.userService.loginUser(form.value.name, form.value.password);

//       this.submitted = true;
//     } else {
//       if (window.confirm(`Create user "${form.value.name}" ?`))
//         this.userService.createUser(form.value.name, form.value.password);
//       return;
//     }
//   }
//   protected switchLoginMode() {
//     this.loginMode = !this.loginMode;
//   }
//   protected logout() {
//     this.auth.logout();
//   }
// }
