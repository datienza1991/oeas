import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authenticate, User } from '@batstateu/data-models';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@batstateu/app-config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: any) {}

  login(authenticate: Authenticate): Observable<User> {
    return this.httpClient.post<User>(`${this.appConfig.API_URL}/login`, authenticate);
  }

  register(authenticate: any): Observable<Authenticate> {
    return this.httpClient.post<Authenticate>(`${this.appConfig.API_URL}/register`, authenticate);
  }
}
