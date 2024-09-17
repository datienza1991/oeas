import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTakersListComponent } from './exam-takers-list.component';

describe('ExamTakersListComponent', () => {
  let component: ExamTakersListComponent;
  let fixture: ComponentFixture<ExamTakersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamTakersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamTakersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
