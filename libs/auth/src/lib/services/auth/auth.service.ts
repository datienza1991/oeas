import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authenticate, User } from '@batstateu/data-models';
import { Store } from '@ngrx/store';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import * as fromAuth from '@batstateu/auth';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<fromAuth.State>
  ) {}

  login(authenticate: Authenticate): Observable<User> {
    return this.httpClient.post<User>(
      'http://localhost:8080/login',
      authenticate
    );
  }

  register(authenticate: any): Observable<Authenticate> {
    return this.httpClient.post<Authenticate>(
      'http://localhost:8080/register',
      authenticate
    );
  }

  logout() {
    this.store.dispatch(fromAuth.logout());
  }
}
