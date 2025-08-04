import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { userNameSignal } from './signals';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  // providers: [{ provide: RouteReuseStrategy, useClass: CustomRouteStrategy }],
})
export class App {
  // ngOnInit(): void {
  //   console.log('app onInit hit');
  //   if (this.auth.isAuthenticated())
  //     this.username = userNameSignal() + this.suffix;
  // }
  auth = inject(AuthService);
  suffix = "'s";
  username = '';
  computedNameSignal = computed(() => userNameSignal());
  protected readonly title = signal('frontend');
}
