import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { LoadingInterceptor } from './utils/interceptors/basic.interceptor';
import { routes } from './app.routes';
import { BehaviorSubject, Subject } from 'rxjs';
import { LANGUAGE_TOKEN } from './utils/tokens/language-token';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LANGUAGE_TOKEN, useValue: new Subject() },
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withRouterConfig({
        // onSameUrlNavigation: 'reload',
      })
    ),
    provideHttpClient(withFetch(), withInterceptors([LoadingInterceptor])),
  ],
};
