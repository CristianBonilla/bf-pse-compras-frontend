import { FormControl } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { TransactionAlert } from '@shared/enums/transaction-alert.enum';
import { FormSelectOption } from '@shared/types/form.types';

export interface TransactionForm {
  trade: FormControl<string | null>;
  selectAccount: FormControl<FormSelectOption<'Seleccionar cuenta', null> | FormSelectOption<string, string>>;
  amountToPay: FormControl<string>;
  transactionCost: FormControl<string>;
  availableInAccount: FormControl<string>;
}

export interface TransactionAlertInfo {
  icon: IconProp;
  messages: TransactionAlertMessage | string[] | TransactionAlertMessage[] | [TransactionAlertMessage, ...string[]];
  className: string;
};

export interface TransactionAlertMessageInfo {
  icon: IconProp | null;
  text: string | ((...params: any[]) => string);
}

export interface TransactionAlertMessage {
  [messageName: string]: TransactionAlertMessageInfo;
}

export interface TransactionAlertDetail {
  type: TransactionAlert;
  icon: IconProp;
  text: string;
  className: string;
}
