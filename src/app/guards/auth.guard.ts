import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  
  return _authService.userData$.pipe(
    map(userData => {
      if( userData ) {
        return true;
      } else {
        _router.navigate(['/sign-up']);
        return false;
      }
    })
  );
};
