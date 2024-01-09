import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { SharedDataService } from './service/shared-data.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export const carModelGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const sharedDataService = inject(SharedDataService)
  const router = inject(Router)
  console.log(sharedDataService.saveModelData)
  if(sharedDataService.saveModelData) {
    return true
  }
  return router.navigate(['/car-model'])
};
