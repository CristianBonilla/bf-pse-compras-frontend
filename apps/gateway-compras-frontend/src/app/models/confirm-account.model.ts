import { FormControl } from '@angular/forms';

export interface ConfirmAccountForm {
  trade: FormControl<string>;
  accountSelected: FormControl<string>;
  amountToPay: FormControl<string>;
  transactionCost: FormControl<string>;
  availableInAccount: FormControl<string>;
  dynamicKey: FormControl<string | null>;
}
