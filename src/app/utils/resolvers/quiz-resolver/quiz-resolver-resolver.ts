import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Word } from '../../classes/word';
import { TranslateService } from '../../../services/translate-service/translate.service';
import { inject } from '@angular/core';

export const quizResolverResolver: ResolveFn<Observable<Word[]>> = (
  route,
  state
) => {
  const translate = inject(TranslateService);

  return translate.getAllWords();
};
