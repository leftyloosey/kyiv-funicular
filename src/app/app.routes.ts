// import { Routes } from '@angular/router';
// import { Home } from './home/home';
// import { About } from './about/about';

// export const routes: Routes = [
//   {
//     path: '',
//     component: Home,
//     title: 'Home page',
//   },
//   {
//     path: 'about',
//     component: About,
//     title: 'About page',
//   },
// ];

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { About } from './about/about';
import { ActorFormComponent } from './actor/actor-form-component';
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
    component: About,
  },
  {
    path: 'actor',
    component: ActorFormComponent,
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
