/*import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  
  const hasToken = !!localStorage.getItem('access_token');

  if (hasToken) {
    return true;
  } else {
    return _authService.userData$.pipe(
      map(userData => {
        if (userData) {
          _router.navigate(['/tabs/tab1']);
          return true;
        } else {
          _router.navigate(['/sign-up']);
          return false;
        }
      })
    );
  }
};*/
