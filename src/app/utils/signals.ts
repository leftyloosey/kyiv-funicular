import { signal } from '@angular/core';
import { Attempt } from './classes/attempt';

export const userNameSignal = signal<string>('');
export const commentSignal = signal<Attempt>({ entry: '', parentId: '' });
export const indexSignal = signal<number>(0);

export const inputSafetyStorage = signal<string>('');
