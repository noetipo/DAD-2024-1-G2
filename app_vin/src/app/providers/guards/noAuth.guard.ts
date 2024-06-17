import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';

export const NoAuthGuard: CanActivateFn | CanActivateChildFn = (route, state) =>
{

    if ( !localStorage.getItem('accessToken') )
    {
        return true;
    }
};
