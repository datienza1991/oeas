import { TestBed } from '@angular/core/testing';

import { TakeExamService } from './take-exam.service';

describe('TakeExamService', () => {
  let service: TakeExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TakeExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
