import { FormSelectOption } from "@shared/types/form.types";

export const CONFIRM_ACCOUNTS: [FormSelectOption<'Seleccionar cuenta', null>, ...FormSelectOption<string, string>[]] = [
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
