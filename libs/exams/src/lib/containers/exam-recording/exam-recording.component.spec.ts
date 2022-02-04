import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamRecordingComponent } from './exam-recording.component';

describe('ExamRecordingComponent', () => {
  let component: ExamRecordingComponent;
  let fixture: ComponentFixture<ExamRecordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamRecordingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
