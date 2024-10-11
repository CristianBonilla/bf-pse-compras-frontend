import { PersonType } from '@shared/enums/person.enums';
import { FormSelectOption } from '@shared/types/form.types';

export const PERSON_TYPE: [FormSelectOption<'Seleccionar tipo de persona', null>, ...FormSelectOption<string, PersonType>[]] = [
  {
    text: 'Seleccionar tipo de persona',
    value: null,
    selected: true
  },
  {
    text: 'Natural',
    value: PersonType.Natural,
    selected: false
  },
  {
    text: 'Jurídica',
    value: PersonType.Legal,
    selected: false
  }
];
