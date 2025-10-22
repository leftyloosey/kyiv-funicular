import { InjectionToken } from '@angular/core';
import { Quizzable } from '../interfaces/Quizzable';

export const QUIZ = new InjectionToken<Quizzable>('Quiz');
