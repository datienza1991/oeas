import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamTakerList } from '@batstateu/data-models';
import { ExamsService } from '@batstateu/shared';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'batstateu-exam-takers',
  templateUrl: './exam-takers.component.html',
  styleUrls: ['./exam-takers.component.less'],
})
export class ExamTakersComponent implements OnInit {
  examTakerList!: ExamTakerList[];
  examId!: number;

  onViewScore(takerExamIdObj: any) {
    this.examService
      .getAllTakerAnswers(takerExamIdObj.userDetailId, takerExamIdObj.examId)
      .subscribe((val) => {
        this.modal.success({
          nzTitle: 'Total Score',
          nzContent: `The total score is: ${val.reduce((a: any, b: any) => a + b['points'] || 0, 0)}`,
        });

      });
  }
  constructor(
    private examService: ExamsService,
    private route: ActivatedRoute,
    private modal : NzModalService
  ) {}

  ngOnInit(): void {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    this.examService.getAllExamTakers(this.examId, '').subscribe((val) => {
      this.examTakerList = val;
    });
  }
}
