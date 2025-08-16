import { signal } from '@angular/core';
import { Attempt } from './classes/attempt';

export const userNameSignal = signal<string>('');
export const commentSignal = signal<Attempt>({ entry: '', parentId: '' });
