import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTakersComponent } from './exam-takers.component';

describe('ExamTakersComponent', () => {
  let component: ExamTakersComponent;
  let fixture: ComponentFixture<ExamTakersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamTakersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamTakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
