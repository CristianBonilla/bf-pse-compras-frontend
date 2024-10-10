import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from '@module/content/components/form/form.component';
import { ContentComponent } from '@module/content/content.component';
import { StepperComponent } from './components/stepper/stepper.component';

@NgModule({
  declarations: [ContentComponent, FormComponent, StepperComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ContentComponent,
    FormComponent
  ]
})
export class ContentModule { }
