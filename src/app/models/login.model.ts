import { FormControl } from '@angular/forms';
import { DOCUMENT_TYPE } from '@shared/constants/document.constants';
import { PERSON_TYPE } from '@shared/constants/person.constants';

export interface LoginForm {
  personType: FormControl<typeof PERSON_TYPE[number] | null>;
  documentType: FormControl<typeof DOCUMENT_TYPE[number] | null>;
  documentNumber: FormControl<string | null>;
  internetKey: FormControl<string | null>;
};
