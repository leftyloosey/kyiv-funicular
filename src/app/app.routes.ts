import { Routes } from '@angular/router';
import { OffsetQuizFifty } from './modules/offset-quiz-fifty/offset-quiz-fifty';
import { Login } from './modules/login/login';
import { loginGuard } from './utils/guards/login-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'quiz50',
    pathMatch: 'full',
  },
  {
    path: '*',
    redirectTo: 'quiz50',
    pathMatch: 'full',
  },
  {
    path: 'quiz50',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./modules/offset-quiz-fifty/offset-quiz-fifty').then(
        (load) => load.OffsetQuizFifty
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/login//login').then((load) => load.Login),
  },
];
