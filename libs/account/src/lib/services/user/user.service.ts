import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as fromAuth from '@batstateu/auth';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { getUser } from '@batstateu/auth';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<fromAuth.State>
  ) {}

  get(userId: number | undefined): Observable<any> {
    //TODO:Change ip address port to 8081
    return this.httpClient
      .get<any>(`http://localhost:8081/records/userDetails/${userId}`);
  }
}
