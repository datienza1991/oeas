import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ProfileComponent } from './containers/profile/profile.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [
    ProfileFormComponent,
    ProfileComponent
  ],
})
export class AccountModule {}
