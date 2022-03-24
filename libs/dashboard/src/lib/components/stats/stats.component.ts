import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'batstateu-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.less']
})
export class StatsComponent implements OnInit {
  @Input() exams = [{name: 'English'},{name: 'Math'},{name: 'Science'},{name: 'History'},{name: 'test'},{name: 'test'}]
  constructor() { }

  ngOnInit(): void {
  }

}
