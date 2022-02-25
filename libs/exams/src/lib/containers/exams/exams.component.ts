import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Exam, ExamList } from '@batstateu/data-models';
import { ExamsService } from '@batstateu/shared';
@Component({
  selector: 'batstateu-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamsComponent implements OnInit {
  examList! : Exam[];

  getAll(criteria: string) {
    this.examService.getAll(criteria).subscribe((val: Exam[]) => {
      this.examList = val;
    });
  }
  delete(id : number){
    alert(id);
  }
  constructor(private examService : ExamsService) {}

  ngOnInit(): void {this.getAll("");}
}
