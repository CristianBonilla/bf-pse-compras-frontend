import { inject, NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as iconsPack from '@shared/icons';

@NgModule({
  declarations: [],
  imports: [],
  exports: [FontAwesomeModule]
})
export class IconsModule {
  readonly #library = inject(FaIconLibrary);

  constructor() {
    this.#library.addIconPacks(iconsPack);
  }
}
