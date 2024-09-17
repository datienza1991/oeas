import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamItemPointsFormViewComponent } from './exam-item-points-form-view.component';

describe('ExamItemPointsFormViewComponent', () => {
  let component: ExamItemPointsFormViewComponent;
  let fixture: ComponentFixture<ExamItemPointsFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamItemPointsFormViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamItemPointsFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
