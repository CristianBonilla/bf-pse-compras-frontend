import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from '@module/auth/auth-routing.module';
import { AuthComponent } from '@module/auth/auth.component';
import { LoginComponent } from '@module/auth/login/login.component';
import { ContentModule } from '@module/content/content.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ContentModule
  ]
})
export class AuthModule { }
