import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { END_POINTS, EntityDataService, IResponse } from '../../utils';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoleService extends EntityDataService<any> {
    constructor(protected override httpClient: HttpClient) {
        super(httpClient, END_POINTS.setup.role);
    }

    public getByAssigmentRoleById$(data: any): Observable<IResponse> {
        return this.httpClient.get<IResponse>(`${this.endPoint}-usuario/`, {params: data});
      }

      public getByAssigmentRole$(data: any): Observable<IResponse> {
        return this.httpClient.post<IResponse>(`${this.endPoint}-usuario`, data);
      }
}
