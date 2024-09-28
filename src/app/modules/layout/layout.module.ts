import { NgModule } from '@angular/core';
import { FooterComponent } from '@module/layout/footer/footer.component';
import { LayoutRoutingModule } from '@module/layout/layout-routing.module';
import { LayoutComponent } from '@module/layout/layout.component';
import { NavbarComponent } from '@module/layout/navbar/navbar.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
