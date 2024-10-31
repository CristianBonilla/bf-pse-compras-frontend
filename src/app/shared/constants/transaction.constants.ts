import { TransactionAlert } from '@shared/enums/transaction-alert.enum';
import { FormSelectOption } from '@shared/types/form.types';
import { TransactionAlertTypes } from '@shared/types/transaction.types';

export const TRANSACTION: [FormSelectOption<'Seleccionar cuenta', null>, ...FormSelectOption<string, string>[]] = [
  {
    text: 'Seleccionar cuenta',
    selected: true,
    value: null
  },
  {
    text: 'Cuenta corriente • • • • • • 0868',
    selected: false,
    value: 'ES12 3456 7890 12 123450868'
  }
];

export const TRANSACTION_ALERT_TYPES: TransactionAlertTypes = {
  [TransactionAlert.Info]: {
    icon: ['fas', 'circle-info'],
    messages: [
      {
        select: {
          icon: null,
          text: 'Selecciona una cuenta disponible para continuar con la transacción.'
        }
      },
      'Recuerda cumplir todos los flujos de la transacción para ser procesada.'
    ],
    className: 'transaction__alert--info'
  },
  [TransactionAlert.Success]: {
    icon: ['far', 'circle-check'],
    messages: {
      successful: {
        icon: null,
        text: 'Realizamos el pago de tu cuenta y está pendiente la aprobación por PSE, en caso de ser rechazado se reservará a tu cuenta.'
      }
    },
    className: 'transaction__alert--success'
  },
  [TransactionAlert.Warning]: {
    icon: ['fas', 'triangle-exclamation'],
    messages: {
      incorrect: {
        icon: null,
        text: 'Tus datos son incorrectos. Vuelve a intentarlo.'
      },
      insufficientBalance: {
        icon: null,
        text: 'No cuentas con el saldo suficiente para realizar tu transacción.'
      },
      dynamicKeyFailed: {
        icon: null,
        text(attemps: number) {
          return `La clave dinámica no corresponde. Te quedan ${attemps} intentos.`;
        }
      }
    },
    className: 'transaction__alert--warning'
  },
  [TransactionAlert.Danger]: {
    icon: ['fas', 'lock'],
    messages: {
      cancelled: {
        icon: null,
        text: 'Tu transacción ha sido cancelada.'
      },
      invalid: {
        icon: null,
        text: '<strong>Transacción no válida.</strong>&thinsp;Se detectó uso en otro dispositivo. Al realizar tu transacción usa el mismo navegador.'
      },
      declined: {
        icon: null,
        text: 'Tu transacción no pudo ser procesada. Revisa que no se haya realizado la transacción antes de volver a intentarlo.'
      }
    },
    className: 'transaction__alert--danger'
  }
};
