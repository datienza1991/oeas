import { Component, OnInit } from '@angular/core';
import { ExamCard } from '@batstateu/data-models';
import { ExamsService } from '@batstateu/shared';
import { format } from 'date-fns';
import { DashboardService } from '../../services/dashboard.service';
export interface Person {
  key: string;
  date: string;
  details: string;
}
@Component({
  selector: 'batstateu-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  upcomingExams!: ExamCard[];
  constructor(private examService: ExamsService) {}

  ngOnInit(): void {
    const date = format(new Date(), 'yyyy-MM-dd');
    this.examService
      .getAllStartOn(date)
      .subscribe((val) => (this.upcomingExams = val));
  }
}
