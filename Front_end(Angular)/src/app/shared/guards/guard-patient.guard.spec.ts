import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardPatientGuard } from './guard-patient.guard';

describe('guardPatientGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardPatientGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
