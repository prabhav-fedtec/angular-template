import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAppInitializer, inject, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { bearerTokenInterceptor } from './app/interceptors/bearer-token.interceptor';
import { AuthService } from './app/services/auth.service';
import { DevTokenService } from './app/services/dev-token.service';

bootstrapApplication(AppComponent, {
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
})
.catch((err) => console.error(err));
