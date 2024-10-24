import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorizeDynamicKeyComponent } from '@module/content/components/authorize-dynamic-key/authorize-dynamic-key.component';
import { DynamicKeyComponent } from '@module/content/components/dynamic-key/dynamic-key.component';
import { FormComponent } from '@module/content/components/form/form.component';
import { LoaderComponent } from '@module/content/components/loader/loader.component';
import { SelectComponent } from '@module/content/components/select/select.component';
import { StepperComponent } from '@module/content/components/stepper/stepper.component';
import { ContentComponent } from '@module/content/content.component';
import { LoaderService } from '@module/content/services/loader/loader.service';
import { StepperService } from '@module/content/services/stepper/stepper.service';
import { IconsModule } from '@shared/icons/icons.module';

@NgModule({
  declarations: [
    ContentComponent,
    FormComponent,
    StepperComponent,
    SelectComponent,
    DynamicKeyComponent,
    AuthorizeDynamicKeyComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ContentComponent,
    FormComponent,
    SelectComponent,
    DynamicKeyComponent,
    AuthorizeDynamicKeyComponent,
    LoaderComponent
  ],
  providers: [StepperService, LoaderService]
})
export class ContentModule { }
