import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@batstateu/data-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getAllHistory(): Observable<User[]> {
    return this.httpClient.get<User[]>(
      'http://localhost:8080/records/users'
    );
  }
}
