import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { TRANSACTION } from '@shared/constants/transaction.constants';
import { TransactionValue } from '@shared/types/transaction.types';

function transactionRequired(control: TransactionValue): ValidationErrors | null {
  const { selected, value } = control.value;

  return selected && !value ? { required: true } : null;
}

@Component({
  selector: 'bf-pc-transaction',
  templateUrl: './transaction.component.html',
  styles: ``
})
export class TransactionComponent {
  readonly #router = inject(Router);
  readonly #currency = inject(CurrencyPipe);
  readonly #formBuilder = inject(FormBuilder);
  readonly confirmAccounts = TRANSACTION;
  readonly transactionForm = this.#formBuilder.group({
    trade: ['Banco Falabella S.A.'],
    selectAccount: [this.confirmAccounts[0], transactionRequired],
    amountToPay: [this.#getCurrency(12720.13)],
    transactionCost: [this.#getCurrency(60)],
    availableInAccount: [this.#getCurrency(20860)]
  });

  get tradeControl() {
    return this.transactionForm.controls.trade;
  }

  get selectAccountControl() {
    return this.transactionForm.controls.selectAccount;
  }

  get amountToPayControl() {
    return this.transactionForm.controls.amountToPay;
  }

  get transactionCostControl() {
    return this.transactionForm.controls.transactionCost;
  }

  get availableInAccountControl() {
    return this.transactionForm.controls.availableInAccount;
  }

  transaction() {
    if (this.transactionForm.valid) {
      this.#router.navigate(['transaction/confirm-account']);
    }
  }

  cancel() {
    this.#router.navigate(['/']);
  }

  #getCurrency(value: number) {
    const currency = this.#currency.transform(value.toString(), 'COP', 'symbol', '1.2-2', 'es-CO');

    return `${currency} COP`;
  }
}
