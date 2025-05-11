import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DevTokenService } from './services/dev-token.service';
import { bearerTokenInterceptor } from './interceptors/bearer-token.interceptor';
import { AuthService } from './services/auth.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    DevTokenService,
    provideAppInitializer(() => inject(DevTokenService).loadToken()),
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([ bearerTokenInterceptor ])
    ),
    AuthService
  ]
};
