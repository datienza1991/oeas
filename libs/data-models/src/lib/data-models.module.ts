import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export { Authenticate } from './authenticate';
export { User } from './user';
export { ExamList } from './exam-list';
@NgModule({
  imports: [CommonModule],
})
export class DataModelsModule {}
