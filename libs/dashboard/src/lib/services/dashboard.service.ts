import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@batstateu/app-config';
import { User } from '@batstateu/data-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: any
  ) {}

  getAllHistory(): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `${this.appConfig.API_URL}/records/users`
    );
  }
}
