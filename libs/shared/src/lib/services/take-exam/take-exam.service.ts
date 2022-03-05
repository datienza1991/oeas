import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@batstateu/app-config';
import {
  ExamAnswer,
  QuestionDetail,
  ResponseWrapper,
  TakerExamDetail,
  TakerExamQuestion,
} from '@batstateu/data-models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TakeExamService {
  addAnswer(val: ExamAnswer): Observable<number> {
    return this.httpClient.post<number>(
      `${this.appConfig.API_URL}/records/examAnswers`,
      val
    );
  }
  getQuestions(examId : number, answerArr: any[]) : Observable<TakerExamQuestion[]> {
    return this.httpClient
      .get<ResponseWrapper<TakerExamQuestion>>(
        `${this.appConfig.API_URL}/records/questions?filter=examId,eq,${examId}&filter=id,nin,${answerArr}`
      )
      .pipe(map((res: ResponseWrapper<any>) => res.records));
  }
  getAnswers(userDetailId: number) : Observable<ExamAnswer[]> {
    return this.httpClient
      .get<ResponseWrapper<ExamAnswer>>(
        `${this.appConfig.API_URL}/records/examAnswers?filter=userDetailId,eq${userDetailId}`
      )
      .pipe(map((res: ResponseWrapper<any>) => res.records));
  }

  get(takerExamId: number): Observable<TakerExamDetail> {
    return this.httpClient.get<TakerExamDetail>(
      `${this.appConfig.API_URL}/records/takerExams/${takerExamId}`
    );
  }

  addTakerExam(val: TakerExamDetail): Observable<number> {
    return this.httpClient.post<number>(
      `${this.appConfig.API_URL}/records/takerExams`,
      val
    );
  }
  updateTakerExam(
    takerExamId: number,
    val: TakerExamDetail
  ): Observable<number> {
    return this.httpClient.put<number>(
      `${this.appConfig.API_URL}/records/takerExams/${takerExamId}`,
      val
    );
  }
  upload(data: any): Observable<any> {
    const serverUrl = `${this.appConfig.API_URL}/file-upload`;
    const formData = new FormData();
    formData.append('file', data, data.name);

    console.log('uploading recording:', data.name);

    return this.httpClient.post<any>(serverUrl, formData);
  }
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: any
  ) {}
}
