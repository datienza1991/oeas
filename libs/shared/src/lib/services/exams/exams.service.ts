import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@batstateu/app-config';
import { Exam, ResponseWrapper } from '@batstateu/data-models';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamsService {
  add(val: Exam): Observable<number> {
    return this.httpClient
      .post<number>(`${this.appConfig.API_URL}/records/exams`, val)
      .pipe(map((res: number) => res));
  }

  getAll(criteria: string): Observable<Exam[]> {
    return this.httpClient
      .get<ResponseWrapper<Exam>>(
        `${this.appConfig.API_URL}/records/exams?join=sections,departments&filter=name,cs,${criteria}`
      )
      .pipe(
        map((res: ResponseWrapper<any>) => {
          const rec: Exam[] = [];
          res.records.map((val) =>
            rec.push({ ...val, department: val.sectionId.departmentId.name })
          );
          return rec;
        })
      );
  }

  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: any
  ) {}
}
