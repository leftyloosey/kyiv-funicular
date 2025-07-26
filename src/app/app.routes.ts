import { RedirectCommand, Router, Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { Login } from './login/login';
import { About } from './about/about';
import { ActorFormComponent } from './actor/actor-form-component';
// import { logGuardGuard } from './log-guard-guard';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { logGuardGuard } from './log-guard-guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    canActivate: [logGuardGuard],
    runGuardsAndResolvers: 'always',
    //   canActivate: [
    //     () => {
    //       const router = inject(Router);
    //       const authService = inject(AuthService);
    //       if (!authService.isAuthenticated()) {
    //         console.log('you are not logged in');
    //         const loginPath = router.parseUrl('/login');
    //         return new RedirectCommand(loginPath, {
    //           skipLocationChange: true,
    //         });
    //       }
    //       return true;
    //     },
    //   ],
    component: About,
    // },
  },
  // {
  //   path: 'actor',
  //   component: ActorFormComponent,
  // },
  {
    path: 'login',

    component: Login,
  },
  {
    path: 'relogin',
    component: Login,
  },
  // {
  //   path: 'home',
  //   loadComponent: () => import('./home/home').then((m) => m.HomeComponent),
  // },
  // {
  //   path: 'about',
  //   loadComponent: () => import('./about/about').then((m) => m.About),
  // },
];
