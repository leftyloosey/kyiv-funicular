import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type lngToken = 'de' | 'uk';
// export interface langToken {
//   tag: lngToken;
// }
export const LANGUAGE_TOKEN = new InjectionToken<BehaviorSubject<lngToken>>(
  'language token'
);
