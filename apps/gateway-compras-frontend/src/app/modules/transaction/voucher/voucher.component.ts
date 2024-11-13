import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepperService } from '@module/content/services/stepper/stepper.service';
import { TransactionAlertService } from '@module/content/services/transaction-alert/transaction-alert.service';
import { Flow } from '@shared/enums/stepper.enums';
import { TransactionAlert } from '@shared/enums/transaction-alert.enum';

@Component({
  selector: 'bf-pc-voucher',
  templateUrl: './voucher.component.html',
  styles: ``
})
export class VoucherComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #transactionAlert = inject(TransactionAlertService);
  readonly #stepper = inject(StepperService);
  readonly TRANSACTION_ALERT = TransactionAlert;
  readonly transactionAlert$ = this.#transactionAlert.transactionAlert$;

  ngOnInit() {
    this.#stepper.update(Flow.Voucher);
  }

  download() {
    this.#router.navigate(['/']);
  }
}
