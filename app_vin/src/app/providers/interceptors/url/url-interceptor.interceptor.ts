import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from "../../../../environments/environment";

export const urlInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
    const url = environment.url;
    if (!req.url.includes('assets')) {
        req = req.clone({
            url: `${url}${req.url}`,
        });
    }
  return next(req);
};
