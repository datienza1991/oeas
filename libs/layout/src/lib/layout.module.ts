import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './containers/layout/layout.component';
import { NgZorroAntdModule } from "@batstateu/ng-zorro-antd";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  imports: [CommonModule, NgZorroAntdModule, RouterModule],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [LayoutComponent]
})
export class LayoutModule {}
