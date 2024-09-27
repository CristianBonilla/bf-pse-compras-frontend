import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from '@module/layout/footer/footer.component';
import { LayoutRoutingModule } from '@module/layout/layout-routing.module';
import { LayoutComponent } from '@module/layout/layout.component';
import { NavbarComponent } from '@module/layout/navbar/navbar.component';
import { IconsModule } from '@shared/icons/icons.module';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    OverlayscrollbarsModule,
    IconsModule
  ]
})
export class LayoutModule { }
