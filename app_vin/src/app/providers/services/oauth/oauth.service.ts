import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { END_POINTS, IResponse } from '../../utils';
import { shareReplay, tap } from 'rxjs/operators';
import { AuthUtils } from '../../../core/auth/auth.utils';
import { get } from 'lodash';

@Injectable({ providedIn: 'root' })
export class OauthService {
    private _authenticated: boolean = false;

    constructor(private http: HttpClient) {}

    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    public authenticate(credentials: any): Observable<IResponse> {
        if (this._authenticated) {
            return throwError(() => new Error('User is already logged in.'));            
        }
        return this.http
            .post<IResponse>(END_POINTS.oauth.login, credentials)
            .pipe(tap(this.setSession.bind(this)), shareReplay());
    }

    private setSession(response: any) {
        if (response) {
            this.accessToken = response.token;
            this._authenticated = true;
            return of(response);
        }
    }
    private notAutorized() {
        localStorage.clear();
    }
    public signOut(): Observable<any>
    {
        this._authenticated = false;
        localStorage.removeItem('accessToken');
        return of(true);
    }

    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        // return this.signInUsingToken();
    }

}
