import { TransactionAlertInfo } from '@models/transaction.model';
import { TransactionAlert } from '@shared/enums/transaction-alert.enum';
import { FormSelectOption } from '@shared/types/form.types';

export type TransactionValue = FormSelectOption<'Seleccionar cuenta', null> | FormSelectOption<string, string>;

export type TransactionAlertTypes = Record<TransactionAlert, TransactionAlertInfo>;
