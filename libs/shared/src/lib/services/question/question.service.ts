import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@batstateu/app-config';
import { QuestionDetail, QuestionList, ResponseWrapper } from '@batstateu/data-models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  delete(id: number): Observable<number> {
    return this.httpClient.delete<number>(
      `${this.appConfig.API_URL}/records/questions/${id}`
    );
  }
  getAll(criteria: string): Observable<QuestionList[]> {
    return this.httpClient
      .get<ResponseWrapper<QuestionList>>(
        `${this.appConfig.API_URL}/records/questions?filter=question,cs,${criteria}`
      )
      .pipe(map((res: ResponseWrapper<any>) => res.records));
  }
  add(val: QuestionDetail): Observable<number> {
    return this.httpClient
      .post<number>(`${this.appConfig.API_URL}/records/questions`, val)
      .pipe(map((res: number) => res));
  }
  get(id: number): Observable<QuestionDetail> {
    return this.httpClient.get<QuestionDetail>(
      `${this.appConfig.API_URL}/records/questions/${id}`
    );
  }
  edit(val: QuestionDetail) : Observable<number> {
    return this.httpClient
      .put<number>(`${this.appConfig.API_URL}/records/questions/${val.id}`, val)
      .pipe(map((res: number) => res));
  }
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: any
  ) {}
}
