import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home';
import { Login } from './modules/login/login';
import { Profile } from './modules/profile/profile';
import { loginGuard } from './utils/guards/log-guard-guard';
import { profileGuard } from './utils/guards/profile-guard-guard';
import { commentResolver } from './utils/resolvers/user.resolver';
import { homeResolver } from './utils/resolvers/home-resolver';
import { Translate } from './modules/translate/translate';
import { Wiktion } from './modules/wiktion/wiktion';
import { Wordmenu } from './modules/wordmenu/wordmenu/wordmenu';
import { Newword } from './modules/newword/newword/newword';
import { Quiz } from './modules/quiz/quiz';
import { quizResolverResolver } from './utils/resolvers/quiz-resolver/quiz-resolver-resolver';

export const routes: Routes = [
  {
    path: 'profile',
    canActivate: [profileGuard],
    resolve: {
      comment: commentResolver,
    },
    component: Profile,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'quiz',
    pathMatch: 'full',
    resolve: {
      words: quizResolverResolver,
    },
    component: Quiz,
  },
  {
    path: 'newword',
    pathMatch: 'full',
    component: Newword,
  },
  {
    path: 'wordmenu',
    pathMatch: 'full',
    component: Wordmenu,
  },
  {
    path: '*',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    resolve: {
      comment: homeResolver,
    },
    component: HomeComponent,
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    component: Login,
  },
  // {
  //   path: 'about',
  //   loadComponent: () => import('./about/about').then((m) => m.About),
  // },
];
