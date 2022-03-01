import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@batstateu/app-config';
import { TakerExamDetail } from '@batstateu/data-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TakeExamService {

  addTakerExam(val: TakerExamDetail): Observable<number> {
    return this.httpClient
      .post<number>(`${this.appConfig.API_URL}/records/takerExams`, val);
  }
  upload(data: any): Observable<any> {
    const serverUrl = `${this.appConfig.API_URL}/file-upload`;
    const formData = new FormData();
    formData.append('file', data, data.name);

    console.log('uploading recording:', data.name);

    return this.httpClient.post<any>(serverUrl,formData);
  }
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: any
  ) {}
}
