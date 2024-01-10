import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { SharedDataService } from './service/shared-data.service';

export const carModelGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const sharedDataService = inject(SharedDataService)
  const router = inject(Router)
  if (sharedDataService.saveModelData) {
    return true
  }
  return router.navigate(['/car-model'])
};
