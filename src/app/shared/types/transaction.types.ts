import { FormSelectOption } from '@shared/types/form.types';

export type TransactionValue = FormSelectOption<'Seleccionar cuenta', null> | FormSelectOption<string, string>;
