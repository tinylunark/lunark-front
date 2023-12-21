import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../account.service';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const accountService = inject(AccountService);
    const userRole :string = accountService.getRole();

    if (userRole == null || !route.data['role'].includes(userRole)) {
      router.navigate(['home']);
      return false;
    }

    return true;
};
