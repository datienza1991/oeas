import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Exam, Section } from '@batstateu/data-models';
import { ExamsService, SectionService } from '@batstateu/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { format } from 'date-fns';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'batstateu-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.less'],
})
export class ExamFormComponent implements OnInit {
  sections!: Section[];
  examDetail!: Exam;
  onSave(val: any) {
    const date = format(new Date(val.startOn), 'yyyy-MM-dd kk:mm:ss');
    if (this.examDetail && this.examDetail.id > 0) {
      this.examService
      .edit({ ...val,id: this.examDetail.id, startOn: date })
      .subscribe(() =>
        this.modal.success({
          nzTitle: 'Success Registration',
          nzContent:
            'Your Sr code will be your user name. <br/> Please wait for your account activation.',
          nzOkText: 'Ok',
        })
      );
    } else {
      this.examService
        .add({ ...val, startOn: date, isActive: true })
        .subscribe(() =>
          this.modal.success({
            nzTitle: 'Success Registration',
            nzContent:
              'Your Sr code will be your user name. <br/> Please wait for your account activation.',
            nzOkText: 'Ok',
          })
        );
    }
  }
  getSections() {
    this.sectionService.getAll().subscribe((val) => {
      this.sections = val;
    });
  }
  getValues() {
    const id = Number(this.route.snapshot.paramMap.get('examId'));
    if (id) {
      this.examService.get(id).subscribe((val) => {
        this.examDetail = val;
      });
    }
  }
  constructor(
    private modal: NzModalService,
    private examService: ExamsService,
    private sectionService: SectionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getValues();
    this.getSections();
  }
}
