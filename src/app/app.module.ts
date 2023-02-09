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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnvironmentLoaderService } from './core/config/environment-loader.service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { CancelComponent } from './shared/cancel/cancel.component';
import { DataService } from './core/services/data-service.service';
import { SessionComponent } from './shared/session/session.component';


registerLocaleData(localeEs, 'es');

const initAppFn = (envService: EnvironmentLoaderService) => {
  return () => envService.loadEnvConfig('./assets/resources/es.json');
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
    ErrordetailComponent,    
    SpinnerComponent,
    CancelComponent,
    SessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule ,
    NgbModule   
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
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
