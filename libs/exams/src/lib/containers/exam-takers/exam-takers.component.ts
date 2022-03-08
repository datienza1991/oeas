import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamTakerList } from '@batstateu/data-models';
import { ExamsService } from '@batstateu/shared';

@Component({
  selector: 'batstateu-exam-takers',
  templateUrl: './exam-takers.component.html',
  styleUrls: ['./exam-takers.component.less'],
})
export class ExamTakersComponent implements OnInit {
  examTakerList!: ExamTakerList[];
  examId!: number;
  constructor(private examService: ExamsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    this.examService.getAllExamTakers(this.examId,'').subscribe((val) => {
      this.examTakerList = val;
    });
  }
}
