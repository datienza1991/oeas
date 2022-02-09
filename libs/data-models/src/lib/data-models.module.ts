import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export { Authenticate } from './authenticate';
export { User } from './user';
export { ExamList } from './exam-list';
export { ExamTakerList } from './exam-taker-list';
export { ExamTakerResultList } from './exam-taker-result-list';
export {UserList} from './user-list'
@NgModule({
  imports: [CommonModule],
})
export class DataModelsModule {}
