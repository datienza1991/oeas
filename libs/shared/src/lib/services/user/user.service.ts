import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@batstateu/app-config';
import { ResponseWrapper, User, UserDetail } from '@batstateu/data-models';
import { Store } from '@ngrx/store';
import { map, Observable, tap, throwError } from 'rxjs';
import  * as fromAuth  from "@batstateu/auth";
@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$! : Observable<User | null>;
  userId! : number;

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
      .post<number>(`${this.appConfig.API_URL}/records/userDetails`, userDetail)
      .pipe(
        map((res: number) => {
          if (res === undefined) {
            throw Error('User Detail not found!');
          }
          return res;
        })
      );
  }

  get(userId: number | undefined): Observable<UserDetail> {
    return this.httpClient
      .get<ResponseWrapper<UserDetail>>(
        `${this.appConfig.API_URL}/records/userDetails?filter=user_id,eq,${userId}`
      )
      .pipe(
        map((res: ResponseWrapper<UserDetail>) => {
          const user = res.records[0];
          if (user === undefined) {
            throw Error('User Detail not found!');
          }
          return user;
        })
      );
  }
  getAll(criteria: string): Observable<UserDetail[]> {
    
    const params = new HttpParams({
      fromString: `filter=user_id,neq,${this.userId}&firstName,cs,${criteria}&filter=middleName,cs,${criteria}&filter=lastName,cs,${criteria}&join=departments&join=sections`,
    });
    return this.httpClient
      .get<ResponseWrapper<UserDetail>>(
        `${this.appConfig.API_URL}/records/v_user_details`,
        { params: params }
      )
      .pipe(
        map((res: ResponseWrapper<UserDetail>) => {
          return res.records;
        })
      );
  }

  deleteUser(user_id: number): Observable<number> {
    return this.httpClient.delete<number>(
      `${this.appConfig.API_URL}/records/users/${user_id}`
    );
  }

  private getUserId (){
    this.user$.subscribe((val)=> this.userId = val?.id || 0);
  }
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: any,
    private store: Store<fromAuth.State>
  ) {
    this.user$ = store.select(fromAuth.getUser);
    this.getUserId();
  }
}
