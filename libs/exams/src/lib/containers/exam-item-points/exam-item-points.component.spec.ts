import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamItemPointsComponent } from './exam-item-points.component';

describe('ExamItemPointsComponent', () => {
  let component: ExamItemPointsComponent;
  let fixture: ComponentFixture<ExamItemPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamItemPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamItemPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
