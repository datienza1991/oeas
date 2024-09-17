import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeExamResultComponent } from './take-exam-result.component';

describe('TakeExamResultComponent', () => {
  let component: TakeExamResultComponent;
  let fixture: ComponentFixture<TakeExamResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeExamResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeExamResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
