import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardDoctorGuard } from './guard-doctor.guard';

describe('guardDoctorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardDoctorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
