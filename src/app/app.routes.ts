import { Routes } from '@angular/router';
import { Wordmenu } from './modules/wordmenu/wordmenu/wordmenu';
import { Newword } from './modules/newword/newword/newword';
import { Quiz } from './modules/quiz/quiz';
import { quizResolverResolver } from './utils/resolvers/quiz-resolver/quiz-resolver-resolver';
import { DynamicFormComponent } from './modules/dynamic-form/dynamic-form';
import { EditWord } from './modules/edit-word/edit-word';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'newword',
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
    path: 'editword',
    pathMatch: 'full',
    component: EditWord,
  },
  {
    path: 'test',
    pathMatch: 'full',
    component: DynamicFormComponent,
  },
  {
    path: 'wordmenu',
    pathMatch: 'full',
    component: Wordmenu,
  },
  {
    path: '*',
    redirectTo: 'newword',
    pathMatch: 'full',
  },
  // {
  //   path: 'about',
  //   loadComponent: () => import('./about/about').then((m) => m.About),
  // },
];
