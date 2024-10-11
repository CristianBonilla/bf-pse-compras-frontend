import { PersonType } from '@shared/enums/person.enum';
import { FormOption } from '@shared/types/form.types';

export const PERSON_TYPE: (FormOption<'Seleccionar tipo de persona', null> | FormOption<string, PersonType>)[] = [
  {
    text: 'Seleccionar tipo de persona',
    value: null
  },
  {
    text: 'Natural',
    value: PersonType.Natural
  },
  {
    text: 'Jurídica',
    value: PersonType.Legal
  }
];
