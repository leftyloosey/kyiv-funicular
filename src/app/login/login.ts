import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginUser } from '../classes/login';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router);

  userService = inject(UserService);
  submitted: boolean = false;
  model = new LoginUser('', '');

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.userService.loginUser(form.value.name, form.value.password);
    this.submitted = true;
  }
}
