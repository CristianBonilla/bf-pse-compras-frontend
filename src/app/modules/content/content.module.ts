import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicKeyComponent } from '@module/content/components/dynamic-key/dynamic-key.component';
import { FormComponent } from '@module/content/components/form/form.component';
import { SelectComponent } from '@module/content/components/select/select.component';
import { StepperComponent } from '@module/content/components/stepper/stepper.component';
import { ContentComponent } from '@module/content/content.component';
import { StepperService } from '@module/content/services/stepper/stepper.service';

@NgModule({
  declarations: [
    ContentComponent,
    FormComponent,
    StepperComponent,
    SelectComponent,
    DynamicKeyComponent
  ],
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
    SelectComponent,
    DynamicKeyComponent
  ],
  providers: [StepperService]
})
export class ContentModule { }
