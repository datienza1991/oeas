import { TestBed } from '@angular/core/testing';

import { ExamGuard } from './exam.guard';

describe('ExamGuard', () => {
  let guard: ExamGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExamGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
