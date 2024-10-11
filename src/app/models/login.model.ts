import { FormControl } from '@angular/forms';
import { DOCUMENT_TYPE } from '@shared/constants/document.constants';
import { PERSON_TYPE } from '@shared/constants/person.constants';

export interface LoginForm {
  personType: FormControl<typeof PERSON_TYPE[number]>;
  documentType: FormControl<typeof DOCUMENT_TYPE[number]>;
  documentNumber: FormControl<string | null>;
  internetKey: FormControl<string | null>;
  businessGroup?: FormControl<string | null>;
  tokenKey?: FormControl<string | null>;
};
