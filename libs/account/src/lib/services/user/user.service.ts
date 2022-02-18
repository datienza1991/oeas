import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@batstateu/app-config';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: any
  ) {}

  get(userId: number | undefined): Observable<any> {
    return this.httpClient
      .get<any>(`${this.appConfig.API_URL}/records/userDetails?filter=userid,eq,${userId}`)
      .pipe(map((res: any) =>{
        return res.records[0]
      }));
  }
}
