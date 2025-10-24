import { signal } from '@angular/core';

export const userNameSignal = signal<string>('');
export const indexSignal = signal<number>(0);

export const inputSafetyStorage = signal<string>('');
export const drawerState = signal<boolean>(false);
