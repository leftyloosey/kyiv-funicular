import { InjectionToken } from '@angular/core';
import { Closeable } from '../interfaces/Closeable';

export const SHUT = new InjectionToken<Closeable>('Close');
export const SHUT2 = new InjectionToken<Closeable>('Close2');
