import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient
  ) {}

  get(userId: number | undefined): Observable<any> {
    //TODO:Change ip address port to 8081
    return this.httpClient
      .get<any>(`http://localhost:8081/records/userDetails/${userId}`);
  }
}
