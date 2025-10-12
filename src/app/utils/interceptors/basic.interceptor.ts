import {
  HttpContextToken,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../../services/loading-service/loading-service';
import { inject } from '@angular/core';

export const SkipLoading = new HttpContextToken<boolean>(() => false);

export function LoadingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  // console.log(req.url);
  const loadingService = inject(LoadingService);
  if (req.context.get(SkipLoading)) {
    return next(req);
  }
  loadingService.loadingOn();
  return next(req).pipe(
    finalize(() => {
      loadingService.loadingOff();
    })
  );
}
