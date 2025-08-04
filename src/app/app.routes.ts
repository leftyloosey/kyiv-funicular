import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { Login } from './login/login';
import { About } from './about/about';
import { Profile } from './profile/profile';
import { loginGuard } from './guards/log-guard-guard';
import { Redirector } from './components/redirector/redirector';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '*',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'redirector',
    component: Redirector,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'profile',
    canActivate: [loginGuard],
    // runGuardsAndResolvers: 'always',
    component: Profile,
  },
  // {
  //   path: 'about',
  //   loadComponent: () => import('./about/about').then((m) => m.About),
  // },
];
