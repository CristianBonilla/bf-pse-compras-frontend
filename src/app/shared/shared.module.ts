import { NgOptimizedImage } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TOASTR_GLOBAL_CONFIG } from '@shared/constants/toastr-config';
import { IconsModule } from '@shared/icons/icons.module';
import { SafeHtmlPipe } from '@shared/pipes/safe-html/safe-html.pipe';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';

@NgModule({
  declarations: [
    SafeHtmlPipe
  ],
  imports: [
    ToastrModule.forRoot(TOASTR_GLOBAL_CONFIG)
  ],
  exports: [
    OverlayscrollbarsModule,
    IconsModule,
    NgxTrimDirectiveModule,
    SafeHtmlPipe,
    AngularSvgIconModule
  ],
  providers: [ToastrService]
})
export class SharedModule { }
