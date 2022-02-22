import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@batstateu/app-config';
import { ResponseWrapper, User, UserDetail } from '@batstateu/data-models';
import { Store } from '@ngrx/store';
import { map, Observable, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  save(userDetail: UserDetail): Observable<number> {
    if (userDetail.id > 0) {
      return this.httpClient
        .put<number>(
          `${this.appConfig.API_URL}/records/userDetails/${userDetail.id}`,
          userDetail
        )
        .pipe(
          map((res: number) => {
            return res;
          })
        );
    }
    return this.httpClient
      .post<number>(`${this.appConfig.API_URL}/records/userDetails`,userDetail)
      .pipe(
        map((res: number) => {
          if (res === undefined) {
            throw Error('User Detail not found!');
          }
          return res;
        })
      );
  }
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: any
  ) {}

  get(userId: number | undefined): Observable<UserDetail> {
    return this.httpClient
      .get<ResponseWrapper<UserDetail>>(
        `${this.appConfig.API_URL}/records/userDetails?filter=user_id,eq,${userId}&join=sections&join=departments&join=users`
      )
      .pipe(
        map((res: ResponseWrapper<any>) => {
          const user = res.records[0];
          if (user === undefined) {
            throw Error('User Detail not found!');
          }
          return {...user, code: user.user_id.username};
        })
      );
  }
}
