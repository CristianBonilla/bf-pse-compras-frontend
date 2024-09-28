import { NgModule } from '@angular/core';
import { TOASTR_GLOBAL_CONFIG } from '@shared/constants/toastr-config';
import { IconsModule } from '@shared/icons/icons.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';

@NgModule({
  declarations: [],
  imports: [
    ToastrModule.forRoot(TOASTR_GLOBAL_CONFIG),
  ],
  exports: [
    OverlayscrollbarsModule,
    IconsModule,
    NgxTrimDirectiveModule
  ],
  providers: [ToastrService]
})
export class SharedModule { }
