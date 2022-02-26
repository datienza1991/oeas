import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Exam, Section } from '@batstateu/data-models';
import { ExamsService, SectionService } from '@batstateu/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { format } from 'date-fns';
@Component({
  selector: 'batstateu-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.less'],
})
export class ExamFormComponent implements OnInit {
  sections! : Section[];
  onSave(val: any) {
    const date = format(val.startOn,'yyyy-MM-dd kk:mm:ss');
    this.examService
      .add({ ...val,startOn: date, isActive: true })
      .subscribe(() =>
        this.modal.success({
          nzTitle: 'Success Registration',
          nzContent:
            'Your Sr code will be your user name. <br/> Please wait for your account activation.',
          nzOkText: 'Ok',
        })
      );
  }
  getSections() {
    this.sectionService.getAll().subscribe((val) => {
      this.sections = val;
    });
  }
  constructor(
    private modal: NzModalService,
    private examService: ExamsService,
    private sectionService: SectionService
  ) {}

  ngOnInit(): void {this.getSections();}
}
