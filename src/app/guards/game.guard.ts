import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ProgressService } from '../services/progress.service';

export const gameGuard = (gameNumber: number): CanActivateFn => {
  return () => {
    const progress = inject(ProgressService);
    const router = inject(Router);
    if (progress.canAccess(gameNumber)) return true;
    // Return a UrlTree so the router redirects cleanly (avoids blank page on reload)
    // return router.createUrlTree(['/']);
    router.navigate(['/']);
    return false;
  };
};
