import { Injectable } from '@angular/core';
import { TransactionAlert } from '@shared/enums/transaction-alert.enum';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class TransactionAlertService {
  readonly #transactionAlert = new ReplaySubject<TransactionAlert>(1);
  transactionAlert$ = this.#transactionAlert.asObservable();

  updateTransactionAlert(transactionAlert: TransactionAlert) {
    this.#transactionAlert.next(transactionAlert);
  }
}
