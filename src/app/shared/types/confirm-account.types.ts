import { FormControl } from '@angular/forms';
import { FormSelectOption } from '@shared/types/form.types';

export type ConfirmAccountValue = FormControl<FormSelectOption<'Seleccionar cuenta', null> | FormSelectOption<string, string>>;
