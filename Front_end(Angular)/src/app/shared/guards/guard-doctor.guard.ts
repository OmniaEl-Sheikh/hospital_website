import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const guardDoctorGuard: CanActivateFn = (route, state) => {
  let _Router=inject(Router)
  let _AuthService=inject(AuthService)
  let auth=_AuthService.auth

  if(localStorage.getItem('Token')!=null&&auth=="doctor"){
    return true;

  }else{
  _Router.navigate(['/login'])
  return false;
  }};
