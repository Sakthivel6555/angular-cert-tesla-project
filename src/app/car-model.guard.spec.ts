import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { carModelGuard } from './car-model.guard';

describe('carModelGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => carModelGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
