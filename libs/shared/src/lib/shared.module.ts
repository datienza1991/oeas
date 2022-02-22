import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgZorroAntdModule } from "@batstateu/ng-zorro-antd";
import { UserFormViewComponent } from "./components/user-form-view/user-form-view.component";

export * from './shared';
export * from './services/user/user.service';
export * from './pipes/status/status.pipe';
export * from './services/section/section.service';
export * from './services/department/department.service';
export * from './services/user-type/user-type.service';
@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      NgZorroAntdModule,
      RouterModule
    ],
    declarations: [
        UserFormViewComponent
    ],
    exports:[
      UserFormViewComponent
    ]
  })
  export class SharedModule {}