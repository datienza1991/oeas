import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TakeExamService {
  constructor(private httpClient: HttpClient) {}

  upload(data: any): Observable<any> {
    const serverUrl = 'http://localhost:8080/file-upload';
    const formData = new FormData();
    formData.append('file', data, data.name);

    console.log('uploading recording:', data.name);

    return this.httpClient.post<any>(serverUrl,formData);
  }
}
