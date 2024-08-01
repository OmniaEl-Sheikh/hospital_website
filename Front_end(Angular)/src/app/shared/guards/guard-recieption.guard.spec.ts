import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardRecieptionGuard } from './guard-recieption.guard';

describe('guardRecieptionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardRecieptionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
