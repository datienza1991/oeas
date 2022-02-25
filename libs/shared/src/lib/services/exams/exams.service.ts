import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@batstateu/app-config';
import { Exam, ResponseWrapper } from '@batstateu/data-models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  getAll(criteria: string): Observable<Exam[]> {
    return this.httpClient
      .get<ResponseWrapper<Exam>>(
        `${this.appConfig.API_URL}/records/exams?join=sections,departments`
      )
      .pipe(
        map((res: ResponseWrapper<any>) => {
          const rec:Exam[] = [];
          res.records.map((val) => rec.push({...val, department: val.sectionId.departmentId.name }))
          return rec;
        })
      );
  }
  
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: any
  ) {}
}