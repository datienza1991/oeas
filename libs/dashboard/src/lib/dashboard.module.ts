import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { StatsComponent } from './components/stats/stats.component';
import { HistoryComponent } from './components/history/history.component';
import { NgZorroAntdModule } from '@batstateu/ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent },
    ]),
  ],
  declarations: [DashboardComponent, StatsComponent, HistoryComponent],
})
export class DashboardModule {}
