import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from '@module/content/components/form/form.component';
import { SelectComponent } from '@module/content/components/select/select.component';
import { StepperComponent } from '@module/content/components/stepper/stepper.component';
import { ContentComponent } from '@module/content/content.component';

@NgModule({
  declarations: [ContentComponent, FormComponent, StepperComponent, SelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ContentComponent,
    FormComponent,
    SelectComponent
  ]
})
export class ContentModule { }
