import { Component, OnInit } from '@angular/core';
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
  listOfData: Person[] = [
    {
      key: '1',
      date: '12/23/2020 00:00:00',
      details: "Something done with the app"
    },
    {
      key: '2',
      date: '01/24/2022 01:01:01',
      details: "Something added with the app",
    },
    {
      key: '3',
      date: '01/24/2022 01:01:01',
      details: "Something added with the app",
    },
    {
      key: '1',
      date: '01/24/2022 01:01:01',
      details: "Something edit with the app",
    },
    {
      key: '2',
      date: '01/24/2022 01:01:01',
      details: "Something deleted with the app",
    },
    {
      key: '3',
      date: '01/24/2022 01:01:01',
      details: "Something done with the app",
    },
    {
      key: '1',
      date: '01/24/2022 01:01:01',
      details: "Something done with the app",
    },
    {
      key: '2',
      date: '01/24/2022 01:01:01',
      details: "Something done with the app",
    },
    {
      key: '3',
      date: '01/24/2022 01:01:01',
      details: "Something done with the app",
    },
    {
      key: '1',
      date: '01/24/2022 01:01:01',
      details: "Something done with the app",
    },
    {
      key: '2',
      date: '01/24/2022 01:01:01',
      details: "Something done with the app",
    },
    {
      key: '3',
      date: '01/24/2022 01:01:01',
      details: "Something done with the app",
    },
  ];
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getAllHistory().subscribe({next: (val) => console.log(val)});
  }
}
