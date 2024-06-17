import {HttpEvent, HttpEventType, HttpInterceptorFn} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {inject} from "@angular/core";
import {catchError, tap, throwError} from "rxjs";
// import {inject} from "@angular/core";


export const toastInterceptor: HttpInterceptorFn = (req, next) => {
    const toastr = inject(ToastrService);
    return next(req).pipe(
        tap(event => {
            if (event.type === HttpEventType.Response && req.url.includes('api')) {
                if (event.status >= 200 && event.status < 300) {
                    toastr.success(`${event.body['message'] ?? 'En hora buena'}`, 'Correcto');
                } else if (event.status >= 300 && event.status < 400) {
                    toastr.info(`${event.body['message'] ?? 'Ten mucho cuidado'}`, 'Atención');
                }
            }
        }),
        catchError(err => {
            
            let errorMessage = 'Error desconocido';
            const responseObject:any = {};
            responseObject.error = err;
        
            if(typeof responseObject === 'object' && err !== null) {
                if (responseObject.error.error.error === 'Unauthorized') {
                    errorMessage = 'No tienes permisos para realizar esta acción';
                }
            }
            if (err.error) {
                if (typeof err.error['message'] === 'object' && err.error['message'] !== null) {
                    // Extraer el mensaje del primer campo del objeto message
                    const firstKey = Object.keys(err.error['message'])[0];
                    errorMessage = err.error['message'][firstKey][0];
                } else if (Array.isArray(err.error['message'])) {
                    // Si message es un arreglo
                    errorMessage = err.error['message'][0];
                } else if (typeof err.error['message'] === 'string') {
                    // Si message es una cadena de texto
                    errorMessage = err.error['message'];
                }
            }

            // Manejar respuestas de error
            if (err.status >= 400 && err.status < 500) {
                toastr.error(errorMessage, 'Error');
            } else if (err.status >= 500) {
                toastr.error(errorMessage, 'Error Grave');
            }
    
            return throwError(err);
        })
    );
};





//
// import { Injectable, Injector } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
//
//
// @Injectable()
// export class ToastInterceptor implements HttpInterceptor {
//     constructor(private toast: ToastrService) {}
//
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//
//         if (req.url.includes('api')) {
//             // Mostrar el alerta
//             alertService.show('nombreAlerta');
//         }
//
//         return next.handle(req);
//     }
// }

