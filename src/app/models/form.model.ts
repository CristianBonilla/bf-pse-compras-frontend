import { FormControl } from '@angular/forms';
import { DOCUMENT_TYPE } from '@shared/constants/document.constants';
import { PERSON_TYPE } from '@shared/constants/person.constants';

export interface LoginForm {
  personType: FormControl<typeof DOCUMENT_TYPE | null>;
  documentType: FormControl<typeof PERSON_TYPE | null>;
  documentNumber: FormControl<number | null>;
  internetKey: FormControl<number | null>;
};
