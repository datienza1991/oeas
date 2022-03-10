import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@batstateu/app-config';
import { Exam, ExamAnswer, ExamAnswerList, ExamTakerList, ExamTakerResultList, ResponseWrapper } from '@batstateu/data-models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamsService {
  edit(val: Exam): Observable<number> {
    return this.httpClient
      .put<number>(`${this.appConfig.API_URL}/records/exams/${val.id}`, val)
      .pipe(map((res: number) => res));
  }
  get(id: number): Observable<Exam> {
    return this.httpClient.get<Exam>(
      `${this.appConfig.API_URL}/records/exams/${id}`
    );
  }
  delete(id: number): Observable<number> {
    return this.httpClient.delete<number>(
      `${this.appConfig.API_URL}/records/exams/${id}`
    );
  }
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

  getAllTakerAnswers(userDetailId: number, examId: number ): Observable<ExamAnswer[]> {
    return this.httpClient
      .get<ResponseWrapper<ExamAnswer>>(
        `${this.appConfig.API_URL}/records/examAnswers?filter=userDetailId,eq,${userDetailId}&filter=examId,eq,${examId}`
      )
      .pipe(
        map((res: ResponseWrapper<any>) => {
          return res.records;
        })
      );
  }

  getAllTakerAnswersByCriteria(userDetailId: number, examId: number, criteria : string): Observable<ExamTakerResultList[]> {
    return this.httpClient
      .get<ResponseWrapper<ExamTakerResultList>>(
        `${this.appConfig.API_URL}/records/examAnswers?join=questions&filter=userDetailId,eq,${userDetailId}&filter=examId,eq,${examId}`
      )
      .pipe(
        map((res: ResponseWrapper<any>) => {
          const rec: ExamTakerResultList[] = [];
          res.records.map((val) => {
            if (
              val.questionId?.question.includes(criteria)
            ) {
              rec.push({
                id: val.id,
                name: val.questionId?.question,
                points: val.points
              });
            }
          });
          return rec;
        })
      );
  }

  getAllExamTakers(
    examId: number,
    criteria: string
  ): Observable<ExamTakerList[]> {
    return this.httpClient
      .get<ResponseWrapper<ExamTakerList>>(
        `${this.appConfig.API_URL}/records/takerExams?join=userDetails,departments&join=userDetails,sections&filter=examId,eq,${examId}`
      )
      .pipe(
        map((res: ResponseWrapper<any>) => {
          const rec: ExamTakerList[] = [];
          res.records.map((val) => {
            if (
              val.userDetailId.firstName.includes(criteria) ||
              val.userDetailId.middleName.includes(criteria) ||
              val.userDetailId.lastName.includes(criteria)
            ) {
              rec.push({
                id: val.id,
                name: `${val.userDetailId?.firstName} ${val.userDetailId?.middleName} ${val.userDetailId?.lastName}`,
                section: val.userDetailId?.sectionId?.name,
                department: val.userDetailId?.departmentId?.name,
                score: '',
                hasRecording: val.recUrl !== '',
                recUrl: val.recUrl,
                userDetailId: val.userDetailId?.id,
                examId: val.examId,
              });
            }
          });
          return rec;
        })
      );
  }

  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: any
  ) {}
}
