import { Component, Input, OnInit } from '@angular/core';
import { ExamCard } from '@batstateu/data-models';

@Component({
  selector: 'batstateu-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.less']
})
export class StatsComponent implements OnInit {
  @Input() upcomingExams! : ExamCard[];
  constructor() { }

  ngOnInit(): void {
  }

}
