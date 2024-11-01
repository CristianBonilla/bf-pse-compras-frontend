import { LOCALE_ID, ValueProvider } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';

registerLocaleData(localeEsCO);

export const LOCALE_ID_PROVIDER: ValueProvider = {
  provide: LOCALE_ID,
  useValue: 'es-CO'
};
