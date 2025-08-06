import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginUser } from '../../classes/login';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { loginGuard } from '../../guards/log-guard-guard';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router);
  loginMode: boolean = true;
  userService = inject(UserService);
  submitted: boolean = false;
  model = new LoginUser('', '');

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (this.loginMode) {
      this.userService.loginUser(form.value.name, form.value.password);
    } else {
      if (window.confirm(`Create user "${form.value.name}" ?`))
        this.userService.createUser(form.value.name, form.value.password);
      return;
    }

    this.submitted = true;
  }
  switchLoginMode() {
    this.loginMode = !this.loginMode;
  }
}
