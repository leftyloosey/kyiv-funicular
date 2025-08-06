import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Login } from './pages/login/login';
import { Profile } from './pages/profile/profile';
import { loginGuard } from './guards/log-guard-guard';
import { Redirector } from './components/redirector/redirector';
import { commentResolver } from './resolvers/user.resolver';

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
    resolve: {
      user: commentResolver,
    },
    // runGuardsAndResolvers: 'always',
    component: Profile,
  },
  // {
  //   path: 'about',
  //   loadComponent: () => import('./about/about').then((m) => m.About),
  // },
];
