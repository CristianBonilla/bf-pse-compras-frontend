import { Injectable } from '@angular/core';
import { TransactionAlertMessage, TransactionAlertInfo, TransactionAlertDetail } from '@models/transaction.model';
import { TRANSACTION_ALERT_TYPES } from '@shared/constants/transaction.constants';
import { TransactionAlert } from '@shared/enums/transaction-alert.enum';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class TransactionAlertService {
  readonly #transactionAlertTypes = TRANSACTION_ALERT_TYPES;
  readonly #transactionAlertDefaultInfo = this.#transactionAlertTypes[TransactionAlert.Info];
  readonly #transactionAlertDefaultDetail: TransactionAlertDetail = {
    ...this.#transactionAlertDefaultInfo,
    type: TransactionAlert.Info,
    text: (this.#transactionAlertDefaultInfo.messages as [TransactionAlertMessage, ...string[]])[1],
  };
  readonly #transactionAlert = new ReplaySubject<TransactionAlertDetail>(1);
  transactionAlert$ = this.#transactionAlert.asObservable();

  updateTransactionAlertFromMessageIndex(
    transactionAlert: TransactionAlert,
    messageIndex: number | string,
    ...textParamValues: any[]
  ) {
    this.#transactionAlert.next(
      this.#getTransactionAlertFromMessageIndex(
        transactionAlert,
        messageIndex,
        textParamValues
      )
    );
  }

  #getTransactionAlertFromMessageIndex(
    transactionAlert: TransactionAlert,
    messageIndex: number | string,
    ...textParamValues: any[]
  ): TransactionAlertDetail {
    const { icon: iconDefault, messages, className } = this.#transactionAlertTypes[transactionAlert];
    if (messagesIsObject(messages) && !!messages[messageIndex]) {
      const { icon, text } = messages[messageIndex];

      return {
        type: transactionAlert,
        icon: icon ?? iconDefault,
        text: typeof text === 'function' ? text.apply(null, textParamValues) : text,
        className
      };
    } else if (messagesIsStringInArray(messages) && !!messages[messageIndex as number]) {
      return {
        type: transactionAlert,
        icon: iconDefault,
        text: messages[messageIndex as number],
        className
      };
    } else if (messageIsObjectsInArray(messages)) {
      const message = messages.find(message => !!message[messageIndex])?.[messageIndex];
      if (!!message) {
        const { icon, text } = message;

        return {
          type: transactionAlert,
          icon: icon ?? iconDefault,
          text: typeof text === 'function' ? text.apply(null, textParamValues) : text,
          className
        };
      }
    } else if (messagesIsObjectStringInArray(messages)) {
      const [transactionAlertMessage, ...transactionAlerts] = messages;
      if (!!transactionAlertMessage[messageIndex]) {
        const { icon, text } = transactionAlertMessage[messageIndex];

        return {
          type: transactionAlert,
          icon: icon ?? iconDefault,
          text: typeof text === 'function' ? text.apply(null, textParamValues) : text,
          className
        };
      } else if (!!transactionAlerts[messageIndex as number]) {
        return {
          type: transactionAlert,
          icon: iconDefault,
          text: transactionAlerts[messageIndex as number],
          className
        };
      }
    }

    return this.#transactionAlertDefaultDetail;
  }
}

function messagesIsObject(
  messages: TransactionAlertInfo['messages']
): messages is TransactionAlertMessage {
  return !Array.isArray(messages) && typeof messages === 'object';
}

function messagesIsStringInArray(
  messages: TransactionAlertInfo['messages']
): messages is string[] {
  return Array.isArray(messages) && messages.every(message => typeof message === 'string');
}

function messageIsObjectsInArray(
  messages: TransactionAlertInfo['messages']
): messages is TransactionAlertMessage[] {
  return Array.isArray(messages) && messages.every(message => typeof message === 'object');
}

function messagesIsObjectStringInArray(
  messages: TransactionAlertInfo['messages']
): messages is [TransactionAlertMessage, ...string[]] {
  if (Array.isArray(messages)) {
    const [transactionAlertMessage, ...transactionAlerts] = messages as [TransactionAlertMessage, ...string[]];

    return typeof transactionAlertMessage === 'object' && transactionAlerts.every(message => typeof message === 'string');
  }

  return false;
}
