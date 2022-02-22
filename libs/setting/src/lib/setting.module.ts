import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgZorroAntdModule } from '@batstateu/ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './containers/users/users.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { DepartmentListComponent, UserFormViewComponent } from '@batstateu/shared';
import { UserFormComponent } from './containers/user-form/user-form.component';
import { StatusPipe } from '@batstateu/shared';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      { path: '', pathMatch : 'full', redirectTo: "users" },
      { path: 'users', component: UsersComponent},
      { path: 'users/:id/edit', component: UserFormComponent},
      { path: 'users/add', component: UserFormComponent},
    ]),
  ],
  declarations: [
    UsersComponent,
    UserListComponent,
    UserFormViewComponent,
    UserFormComponent,
    DepartmentListComponent,
    StatusPipe
  ],
})
export class SettingModule {}
