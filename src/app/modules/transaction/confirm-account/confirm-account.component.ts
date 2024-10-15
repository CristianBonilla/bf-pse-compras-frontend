import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmAccountForm } from '@models/confirm-account.model';
import { CONFIRM_ACCOUNTS } from '@shared/constants/confirm-account.constants';
import { ConfirmAccountValue } from '@shared/types/confirm-account.types';
import { FormGroupDynamic } from '@shared/types/form.types';

function accountRequired(control: ConfirmAccountValue): ValidationErrors | null {
  const { selected, value } = control.value;

  return selected && !value ? { required: true } : null;
}

@Component({
  selector: 'bf-pc-confirm-account',
  templateUrl: './confirm-account.component.html',
  styles: ``
})
export class ConfirmAccountComponent {
  readonly #router = inject(Router);
  readonly #currency = inject(CurrencyPipe);
  readonly #formBuilder = inject(FormBuilder);
  readonly confirmAccounts = CONFIRM_ACCOUNTS;
  readonly confirmAccountForm = this.#formBuilder.group<FormGroupDynamic<ConfirmAccountForm>>({
    trade: ['Banco Falabella S.A.'],
    selectAccount: [this.confirmAccounts[0], accountRequired],
    amountToPay: [this.#getCurrency(12720.13)],
    transactionCost: [this.#getCurrency(60)],
    availableInAccount: [this.#getCurrency(20860)]
  });

  get tradeControl() {
    return this.confirmAccountForm.controls.trade;
  }

  get selectAccountControl() {
    return this.confirmAccountForm.controls.selectAccount;
  }

  get amountToPayControl() {
    return this.confirmAccountForm.controls.amountToPay;
  }

  get transactionCostControl() {
    return this.confirmAccountForm.controls.transactionCost;
  }

  get availableInAccountControl() {
    return this.confirmAccountForm.controls.availableInAccount;
  }

  confirmAccount() {
    this.#router.navigate(['transaction/voucher']);
  }

  cancel() {
    this.#router.navigate(['/']);
  }

  #getCurrency(value: number) {
    const currency = this.#currency.transform(value.toString(), 'COP', 'symbol', '1.2-2', 'es-CO');

    return `${currency} COP`;
  }
}
