import { CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '@module/content/services/loader/loader.service';
import { StepperService } from '@module/content/services/stepper/stepper.service';
import { TRANSACTION } from '@shared/constants/transaction.constants';
import { Flow } from '@shared/enums/stepper.enums';
import { selectRequired } from '@shared/utils/validators/select.validator';
import { from, timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'bf-pc-transaction',
  templateUrl: './transaction.component.html',
  styles: ``
})
export class TransactionComponent implements OnInit, AfterViewInit {
  readonly #router = inject(Router);
  readonly #currency = inject(CurrencyPipe);
  readonly #formBuilder = inject(FormBuilder);
  readonly #loader = inject(LoaderService);
  readonly loading$ = this.#loader.loading$;
  readonly confirmAccounts = TRANSACTION;
  readonly transactionForm = this.#formBuilder.group({
    trade: ['Banco Falabella S.A.'],
    selectAccount: [this.confirmAccounts[0], selectRequired],
    amountToPay: [this.#getCurrency(12720.13)],
    transactionCost: [this.#getCurrency(60)],
    availableInAccount: [this.#getCurrency(20860)]
  });
  readonly #stepper = inject(StepperService);

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

  ngOnInit() {
    this.#stepper.update(Flow.DefinitionPay);
  }

  ngAfterViewInit() {
    this.selectAccountControl.patchValue(this.confirmAccounts[0]);
  }

  transaction() {
    if (this.transactionForm.valid) {
      this.#loader.showLoader();
      timer(5000)
        .pipe(take(1))
        .subscribe(() => {
          from(
            this.#router.navigate(['transaction/confirm-account'])
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
