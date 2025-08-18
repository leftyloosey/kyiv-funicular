import { signal } from '@angular/core';
import { Attempt } from './classes/attempt';

export const userNameSignal = signal<string>('');
export const commentSignal = signal<Attempt>({ entry: '', parentId: '' });
export const nestedSignal = signal<boolean>(true);
export const scrollSignal = signal<boolean>(true);
