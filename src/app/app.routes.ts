import { Routes } from '@angular/router';
import { Newword } from './modules/newword/newword/newword';
// import { quizResolverResolver } from './utils/resolvers/quiz-resolver/quiz-resolver-resolver';
import { OffsetQuizFifty } from './modules/offset-quiz-fifty/offset-quiz-fifty';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'newword',
    pathMatch: 'full',
  },
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
    path: 'quiz50',
    loadComponent: () =>
      import('./modules/offset-quiz-fifty/offset-quiz-fifty').then(
        (load) => load.OffsetQuizFifty
      ),
  },
];
