import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFormViewComponent } from './question-form-view.component';

describe('QuestionFormViewComponent', () => {
  let component: QuestionFormViewComponent;
  let fixture: ComponentFixture<QuestionFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionFormViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
