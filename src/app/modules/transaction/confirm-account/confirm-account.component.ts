import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmAccountForm } from '@models/confirm-account.model';
import { StepperService } from '@module/content/services/stepper/stepper.service';
import { Flow } from '@shared/enums/stepper.enums';
import { FormGroupDynamic } from '@shared/types/form.types';

@Component({
  selector: 'bf-pc-confirm-account',
  templateUrl: './confirm-account.component.html',
  styles: ``
})
export class ConfirmAccountComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #currency = inject(CurrencyPipe);
  readonly #formBuilder = inject(FormBuilder);
  readonly confirmAccountForm = this.#formBuilder.group<FormGroupDynamic<ConfirmAccountForm>>({
    trade: ['Banco Falabella S.A.'],
    accountSelected: ['Cuenta corriente • • • • • • 0868'],
    amountToPay: [this.#getCurrency(12720.13)],
    transactionCost: [this.#getCurrency(60)],
    availableInAccount: [this.#getCurrency(20860)]
  });
  readonly #stepper = inject(StepperService);

  get tradeControl() {
    return this.confirmAccountForm.controls.trade;
  }

  get selectAccountControl() {
    return this.confirmAccountForm.controls.accountSelected;
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

  ngOnInit() {
    this.#stepper.update(Flow.Confirm);
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
