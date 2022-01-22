import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Authenticate } from '@batstateu/data-models'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  login( authenticate: Authenticate): Observable<any>{
    return this.httpClient.post('http://',authenticate)
  }
}
