import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export interface FormOption<T = string, V = string> {
  text: T;
  value: V;
};

export enum PersonType {
  Natural,
  Legal
};

export enum DocumentType {
  CC = 'CC',
  NIT = 'NIT',
  CE = 'CE',
  TI = 'TI',
  PAS = 'PAS',
  CD = 'CD'
}

export const LOGIN_PERSON_TYPE: (FormOption<'Seleccionar tipo de persona', null> | FormOption<string, PersonType>)[] = [
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

export const LOGIN_DOCUMENT_TYPE: (FormOption<'Seleccionar tipo de documento', null> | FormOption<string, DocumentType>)[] = [
  {
    text: 'Seleccionar tipo de documento',
    value: null
  },
  {
    text: 'CC',
    value: DocumentType.CC
  },
  {
    text: 'NIT',
    value: DocumentType.NIT
  },
  {
    text: 'CE',
    value: DocumentType.CE
  },
  {
    text: 'TI',
    value: DocumentType.TI
  },
  {
    text: 'PAS',
    value: DocumentType.PAS
  },
  {
    text: 'CD',
    value: DocumentType.CD
  }
];

export interface LoginForm {
  personType: FormControl<typeof LOGIN_DOCUMENT_TYPE | null>;
  documentType: FormControl<typeof LOGIN_PERSON_TYPE | null>;
  documentNumber: FormControl<number | null>;
  internetKey: FormControl<number | null>;
};

export type LoginFormGroup = {
  [K in keyof LoginForm]:
    LoginForm[K] |
    [LoginForm[K] | null] |
    [LoginForm[K] | null, ...ValidatorFn[] | []] |
    [];
};
