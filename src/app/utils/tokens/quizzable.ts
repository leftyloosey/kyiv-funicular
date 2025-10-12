import { InjectionToken } from '@angular/core';
import { Quizzable } from '../classes/word';

export const QUIZ = new InjectionToken<Quizzable>('Quiz');
