import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(withInterceptors([
      AuthInterceptor])), provideRouter(routes
    , withComponentInputBinding())]
};
