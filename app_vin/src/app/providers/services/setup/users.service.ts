import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { END_POINTS, EntityDataService } from '../../utils';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService extends EntityDataService<any> {
    constructor(protected override httpClient: HttpClient) {
        super(httpClient, END_POINTS.setup.users);
    }

    public updateStateUserId$(idUser: number): Observable<any> {
        return this.httpClient.get<any>(`auth/usuario/${idUser}`);
    }

    public getUserTreeByUserId$(idUser: number): Observable<any> {
        return this.httpClient.get<any>(`usuario-gerarquia?usuario_id=${idUser}`);
    }
}


