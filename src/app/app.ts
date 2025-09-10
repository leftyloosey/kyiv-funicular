import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { AuthService } from './services/auth-service/auth.service';
import { userNameSignal } from './utils/signals';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // logoutUser() {
  //   this.auth.logout();
  // }
  // auth = inject(AuthService);
  suffix = "'s";
  username = '';
  computedNameSignal = computed(() => userNameSignal());
  protected readonly title = signal('frontend');
}
