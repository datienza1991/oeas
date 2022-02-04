import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamRecordingViewComponent } from './exam-recording-view.component';

describe('ExamRecordingViewComponent', () => {
  let component: ExamRecordingViewComponent;
  let fixture: ComponentFixture<ExamRecordingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamRecordingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamRecordingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
