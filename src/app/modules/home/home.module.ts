import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from '@module/home/home-routing.module';
import { HomeComponent } from '@module/home/home.component';
import { IconsModule } from '@shared/icons/icons.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IconsModule
  ]
})
export class HomeModule { }
