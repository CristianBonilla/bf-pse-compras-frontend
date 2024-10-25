import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmAccountForm } from '@models/confirm-account.model';
import { LoaderService } from '@module/content/services/loader/loader.service';
import { StepperService } from '@module/content/services/stepper/stepper.service';
import { Flow } from '@shared/enums/stepper.enums';
import { FormGroupDynamic } from '@shared/types/form.types';
import { from, timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'bf-pc-confirm-account',
  templateUrl: './confirm-account.component.html',
  styles: ``
})
export class ConfirmAccountComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #currency = inject(CurrencyPipe);
  readonly #formBuilder = inject(FormBuilder);
  readonly #loader = inject(LoaderService);
  readonly loading$ = this.#loader.loading$;
  readonly confirmAccountForm = this.#formBuilder.group<FormGroupDynamic<ConfirmAccountForm>>({
    trade: ['Banco Falabella S.A.', Validators.required],
    accountSelected: ['Cuenta corriente • • • • • • 0868', Validators.required],
    amountToPay: [this.#getCurrency(12720.13), Validators.required],
    transactionCost: [this.#getCurrency(60), Validators.required],
    availableInAccount: [this.#getCurrency(20860), Validators.required],
    dynamicKey: [null]
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

  get dynamicKeyControl() {
    return this.confirmAccountForm.controls.dynamicKey;
  }

  ngOnInit() {
    this.#stepper.update(Flow.Confirm);
  }

  confirmAccount() {
    if (this.confirmAccountForm.valid) {
      this.#loader.showLoader();
      timer(5000)
        .pipe(take(1))
        .subscribe(() => {
          from(
            this.#router.navigate(['transaction/voucher'])
          ).pipe(take(1))
            .subscribe(() => {
              this.#loader.hideLoader();
            });
        });
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
