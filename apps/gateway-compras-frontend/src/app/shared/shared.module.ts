import { NgModule } from '@angular/core';
import { TOASTR_GLOBAL_CONFIG } from '@shared/constants/toastr-config.constants';
import { DynamicKeyDirective } from '@shared/directives/dynamic-key/dynamic-key.directive';
import { NumbersOnlyDirective } from '@shared/directives/numbers-only/numbers-only.directive';
import { IconsModule } from '@shared/icons/icons.module';
import { SafeHtmlPipe } from '@shared/pipes/safe-html/safe-html.pipe';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';

@NgModule({
  declarations: [
    SafeHtmlPipe,
    DynamicKeyDirective,
    NumbersOnlyDirective
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
    DynamicKeyDirective,
    NumbersOnlyDirective
  ],
  providers: [ToastrService]
})
export class SharedModule { }
