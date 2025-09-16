import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// Force redirect to home when directly reloading a game route
try {
  const path = window.location?.pathname ?? '';
  if (path.startsWith('/game/')) {
    window.location.replace('/');
  }
} catch {}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }))
  ]
}).catch(err => console.error(err));
