import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@batstateu/app-config';
import { ResponseWrapper, Section } from '@batstateu/data-models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  getAll(): Observable<Section[]> {
    return this.httpClient
      .get<ResponseWrapper<Section>>(
        `${this.appConfig.API_URL}/records/sections`
      )
      .pipe(
        map((res: ResponseWrapper<Section>) => {
          return res.records;
        })
      );
  }

  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: any
  ) {}
}
