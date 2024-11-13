import { FormControl, ValidationErrors } from '@angular/forms';
import { DocumentTypeValue, PersonTypeValue } from '@shared/types/login.types';
import { TransactionValue } from '@shared/types/transaction.types';

export function selectRequired(control: FormControl<PersonTypeValue | DocumentTypeValue | TransactionValue>): ValidationErrors | null {
  const { selected, value } = control.value;

  return selected && !value ? { required: true } : null;
}
