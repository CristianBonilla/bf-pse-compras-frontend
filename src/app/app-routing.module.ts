import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';
import { Step1Component } from './modules/step1/step1.component';
import { Step2Component } from './modules/step2/step2.component';
import { Step3Component } from './modules/step3/step3.component';
import { SummaryComponent } from './modules/summary/summary.component';

const routes: Routes = [  
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "definition", component: Step1Component, pathMatch: "full" },
  { path: "confirmation", component: Step2Component, pathMatch: "full" },
  { path: "voucher", component: Step3Component, pathMatch: "full" },
  { path: "summary", component: SummaryComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
