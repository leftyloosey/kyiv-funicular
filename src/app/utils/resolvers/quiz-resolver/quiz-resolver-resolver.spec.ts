import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { quizResolverResolver } from './quiz-resolver-resolver';

describe('quizResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => quizResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
