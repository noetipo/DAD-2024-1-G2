import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) =>
{
    const router: Router = inject(Router);
    if (localStorage.getItem('accessToken')) {
        return true;
    } else {
        router.navigate(['/sign-in']);
        return false;
    }
};
