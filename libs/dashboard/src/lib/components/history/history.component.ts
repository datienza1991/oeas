import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../../containers/dashboard/dashboard.component';

@Component({
  selector: 'batstateu-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})

export class HistoryComponent implements OnInit {
  @Input() history : Person[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
