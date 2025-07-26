import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginUser } from '../classes/login';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authService = inject(AuthService);
  submitted: boolean = false;
  model = new LoginUser('', '');

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.authService.getAuthentication(form.value.name, form.value.password);
    this.submitted = true;
  }
}
