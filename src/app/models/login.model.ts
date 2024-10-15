import { FormControl } from '@angular/forms';
import { DOCUMENT_TYPE, PERSON_TYPE } from '@shared/constants/login.constants';

export interface LoginForm {
  personType: FormControl<typeof PERSON_TYPE[number]>;
  documentType: FormControl<typeof DOCUMENT_TYPE[number]>;
  documentNumber: FormControl<string | null>;
  internetKey: FormControl<string | null>;
  businessGroup?: FormControl<string | null>;
  tokenKey?: FormControl<string | null>;
};
