import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmAccountForm } from '@models/confirm-account.model';
import { LoaderService } from '@module/content/services/loader/loader.service';
import { StepperService } from '@module/content/services/stepper/stepper.service';
import { TransactionAlertService } from '@module/content/services/transaction-alert/transaction-alert.service';
import { Flow } from '@shared/enums/stepper.enums';
import { TransactionAlert } from '@shared/enums/transaction-alert.enum';
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
  readonly #transactionAlert = inject(TransactionAlertService);
  readonly #spaceUnicode = '\u2002';

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
      const confirmAccountValue = this.dynamicKeyControl.value;
      if (confirmAccountValue === `123${this.#spaceUnicode}456`) {
        this.#transactionAlert.updateTransactionAlertFromMessageIndex(
          TransactionAlert.Success,
          'successful');
      } else if (confirmAccountValue === `912${this.#spaceUnicode}891`) {
        this.#transactionAlert.updateTransactionAlertFromMessageIndex(
          TransactionAlert.Warning,
          'incorrect'
        );
      } else {
        this.#transactionAlert.updateTransactionAlertFromMessageIndex(
          TransactionAlert.Danger,
          'declined'
        );
      }
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
