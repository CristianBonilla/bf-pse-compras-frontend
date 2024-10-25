import { NgModule } from '@angular/core';
import { TOASTR_GLOBAL_CONFIG } from '@shared/constants/toastr-config.constants';
import { DynamicKeyDirective } from '@shared/directives/dynamic-key/dynamic-key.directive';
import { InputNumbersOnlyDirective } from '@shared/directives/input-numbers-only/input-numbers-only.directive';
import { IconsModule } from '@shared/icons/icons.module';
import { SafeHtmlPipe } from '@shared/pipes/safe-html/safe-html.pipe';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';

@NgModule({
  declarations: [
    SafeHtmlPipe,
    InputNumbersOnlyDirective,
    DynamicKeyDirective
  ],
  imports: [
    ToastrModule.forRoot(TOASTR_GLOBAL_CONFIG)
  ],
  exports: [
    OverlayscrollbarsModule,
    IconsModule,
    NgxTrimDirectiveModule,
    SafeHtmlPipe,
    AngularSvgIconModule,
    InputNumbersOnlyDirective,
    DynamicKeyDirective
  ],
  providers: [ToastrService]
})
export class SharedModule { }
