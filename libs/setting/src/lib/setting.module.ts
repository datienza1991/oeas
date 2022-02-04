import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { NgZorroAntdModule } from '@batstateu/ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      { path: 'profile', component: ProfileComponent },
    ]),
  ],
  declarations: [
    ProfileFormComponent,
    ProfileComponent
  ],
})
export class SettingModule {}
