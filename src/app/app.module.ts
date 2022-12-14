import {APP_INITIALIZER,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { BottomBarComponent } from './shared/bottom-bar/bottom-bar.component';
import { Step1Component } from './modules/step1/step1.component';
import { Step2Component } from './modules/step2/step2.component';
import { Step3Component } from './modules/step3/step3.component';
import { SummaryComponent } from './modules/summary/summary.component';
import { LoginComponent } from './modules/login/login.component';
import {LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { StepsBarComponent } from './shared/steps-bar/steps-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrordetailComponent } from './shared/errordetail/errordetail.component';
import { HttpClientModule } from '@angular/common/http';
import { EnvironmentLoaderService } from './core/config/environment-loader.service';
import { DataService } from './core/services/dataservice';


registerLocaleData(localeEs, 'es');

const initAppFn = (envService: EnvironmentLoaderService) => {
  return () => envService.loadEnvConfig('/assets/config/app-config.json');
};

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    BottomBarComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    SummaryComponent,
    LoginComponent,
    StepsBarComponent,
    ErrordetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule    
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es'},
    DataService,
    EnvironmentLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: initAppFn,
      multi: true,
      deps: [EnvironmentLoaderService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
