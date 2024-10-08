import { NgModule } from '@angular/core';
import { ContentComponent } from '@module/layout/content/content.component';
import { FooterComponent } from '@module/layout/footer/footer.component';
import { HeaderComponent } from '@module/layout/header/header.component';
import { LayoutRoutingModule } from '@module/layout/layout-routing.module';
import { LayoutComponent } from '@module/layout/layout.component';
import { SidebarComponent } from '@module/layout/sidebar/sidebar.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent
  ],
  imports: [
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
