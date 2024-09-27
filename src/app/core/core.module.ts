import { NgModule } from '@angular/core';
import { LOCALE_ID_PROVIDER } from '@core/providers/locale.provider';
import { WINDOW_PROVIDERS } from '@core/providers/window.provider';

@NgModule({
  declarations: [],
  imports: [],
  providers: [LOCALE_ID_PROVIDER, WINDOW_PROVIDERS]
})
export class CoreModule { }
