import { FormControl } from '@angular/forms';
import { FormSelectOption } from '@shared/types/form.types';

export type TransactionValue = FormControl<FormSelectOption<'Seleccionar cuenta', null> | FormSelectOption<string, string>>;
