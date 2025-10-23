import { Routes } from '@angular/router';
// import { Newword } from './modules/newword/newword/newword';
// import { quizResolverResolver } from './utils/resolvers/quiz-resolver/quiz-resolver-resolver';
import { OffsetQuizFifty } from './modules/offset-quiz-fifty/offset-quiz-fifty';
import { WordBuilder } from './modules/word-builder/word-builder';
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
    path: 'builder',
    loadComponent: () =>
      import('./modules/word-builder/word-builder').then(
        (load) => load.WordBuilder
      ),
  },
  {
    path: 'wik',
    loadComponent: () =>
      import('./modules/word-builder/word-builder').then(
        (load) => load.WordBuilder
      ),
  },
  {
    path: 'quiz50',
    loadComponent: () =>
      import('./modules/offset-quiz-fifty/offset-quiz-fifty').then(
        (load) => load.OffsetQuizFifty
      ),
  },
];
