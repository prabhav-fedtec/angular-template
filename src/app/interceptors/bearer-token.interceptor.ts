import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { DevTokenService } from '../services/dev-token.service';

/**
 * Functional interceptor that reads the current token from TokenService
 * and, if in dev mode, clones the request to add the Authorization header.
 */
export const bearerTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Grab the singleton TokenService from DI
  const tokenService = inject(DevTokenService);
  const token = tokenService.getToken();

  // Only in dev mode and if we have a token, clone with header
  if (isDevMode() && token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  // Pass along to the next handler
  return next(req);
};
