import { FormControl } from '@angular/forms';
import { FormSelectOption } from '@shared/types/form.types';

export interface TransactionForm {
  trade: FormControl<string | null>;
  selectAccount: FormControl<FormSelectOption<'Seleccionar cuenta', null> | FormSelectOption<string, string>>;
  amountToPay: FormControl<string>;
  transactionCost: FormControl<string>;
  availableInAccount: FormControl<string>;
}
