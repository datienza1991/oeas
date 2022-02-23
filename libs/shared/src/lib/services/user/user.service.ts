import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@batstateu/app-config';
import {
  ResponseWrapper,
  User,
  UserDetail,
  UserList,
  UserType,
} from '@batstateu/data-models';
import { Store } from '@ngrx/store';
import { map, Observable, tap, throwError } from 'rxjs';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import * as fromAuth from '@batstateu/auth';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$!: Observable<User | null>;
  userId!: number;

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

  changePassword(
    username: string,
    oldPass: string,
    newPass: string
  ): Observable<User> {
    return this.httpClient.post<User>(`${this.appConfig.API_URL}/password`, {
      username: username,
      password: oldPass,
      newPassword: newPass,
    });
  }

  get(userId: number | undefined): Observable<UserDetail> {
    return this.httpClient
      .get<ResponseWrapper<UserDetail>>(
        `${this.appConfig.API_URL}/records/userDetails?filter=user_id,eq,${userId}&join=users&join=user_types`
      )
      .pipe(
        map((res: ResponseWrapper<any>) => {
          const user = res.records[0];
          if (user === undefined) {
            throw Error('User Detail not found!');
          }
          return {
            ...user,
            code: user.user_id.username,
            userType: user.user_type_id.name,
            userTypeId: user.user_type_id.id,
          };
        })
      );
  }
  getUserDetail(id: number): Observable<UserDetail> {
    return this.httpClient
      .get<UserDetail>(
        `${this.appConfig.API_URL}/records/userDetails/${id}?join=users&join=user_types`
      )
      .pipe(
        map((val: any) => {
          return {
            ...val,
            code: val.user_id.username,
            userType: val.user_type_id.name,
            userTypeId: val.user_type_id.id,
          };
        })
      );
  }

  getAll(criteria: string): Observable<UserDetail[]> {
    //FIXME: Others users are not listed on the list
    const params = new HttpParams({
      fromString: `filter=user_id,neq,${this.userId}&filter1=firstName,cs,${criteria}&filter2=middleName,cs,${criteria}&filter3=lastName,cs,${criteria}`,
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
  getAllUserTypes(): Observable<UserType[]> {
    return this.httpClient
      .get<ResponseWrapper<UserType>>(
        `${this.appConfig.API_URL}/records/user_types`
      )
      .pipe(
        map((res: ResponseWrapper<UserType>) => {
          return res.records;
        })
      );
  }
  deleteUser(user_id: number): Observable<number> {
    return this.httpClient.delete<number>(
      `${this.appConfig.API_URL}/records/users/${user_id}`
    );
  }

  private getUserId() {
    this.user$.subscribe((val) => (this.userId = val?.id || 0));
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
