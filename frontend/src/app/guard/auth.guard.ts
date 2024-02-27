import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = Inject(Router)
  const token = localStorage.getItem('jwt')
  if(token) {
    return true;
  } else {
    router.navigateByUrl('/')
    return false
  }
  
};
