import { forwardRef, ExistingProvider } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectComponent } from '@module/content/components/select/select.component';

export const SELECT_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};
