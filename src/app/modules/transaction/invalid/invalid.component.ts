import { Component, inject, OnInit } from '@angular/core';
import { TransactionAlertService } from '@module/content/services/transaction-alert/transaction-alert.service';
import { TransactionAlert } from '@shared/enums/transaction-alert.enum';

@Component({
  selector: 'bf-pc-invalid',
  templateUrl: './invalid.component.html',
  styles: `
    :host ::ng-deep .content__body {
      justify-content: flex-start;
    }
  `
})
export class InvalidComponent implements OnInit {
  readonly #transactionAlert = inject(TransactionAlertService);
  transactionAlert$ = this.#transactionAlert.transactionAlert$;

  ngOnInit() {
    this.#transactionAlert.updateTransactionAlertFromMessageIndex(
      TransactionAlert.Danger,
      'invalid'
    );
  }
}
