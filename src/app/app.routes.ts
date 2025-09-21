import { Routes } from '@angular/router';
// import { Newword } from './modules/newword/newword/newword';
// import { Quiz } from './modules/quiz/quiz';
import { quizResolverResolver } from './utils/resolvers/quiz-resolver/quiz-resolver-resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'newword',
    pathMatch: 'full',
  },
  // {
  //   path: 'quiz',
  //   pathMatch: 'full',
  //   resolve: {
  //     words: quizResolverResolver,
  //   },
  //   component: Quiz,
  // },
  // {
  //   path: 'newword',
  //   pathMatch: 'full',
  //   component: Newword,
  // },
  // {
  //   path: 'editword',
  //   pathMatch: 'full',
  //   component: EditWord,
  // },
  {
    path: '*',
    redirectTo: 'newword',
    pathMatch: 'full',
  },
  {
    path: 'newword',
    loadComponent: () =>
      import('./modules/newword/newword/newword').then((load) => load.Newword),
  },
  {
    path: 'quiz',
    loadComponent: () =>
      import('./modules/quiz/quiz').then((load) => load.Quiz),
    resolve: { words: quizResolverResolver },
  },
];
