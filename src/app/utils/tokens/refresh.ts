import { InjectionToken } from '@angular/core';
import { Refreshable } from '../interfaces/Refreshable';

export const REFRESH = new InjectionToken<Refreshable>('Refresh');
