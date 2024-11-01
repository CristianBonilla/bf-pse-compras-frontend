import { DocumentType } from '@shared/enums/document.enums';
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

export const DOCUMENT_TYPE: [FormSelectOption<'Seleccionar tipo de documento', null>, ...FormSelectOption<string, DocumentType>[]] = [
  {
    text: 'Seleccionar tipo de documento',
    value: null,
    selected: true,
  },
  {
    text: 'CC - Cédula de ciudadania',
    value: DocumentType.CC,
    selected: false
  },
  {
    text: 'NIT - Número de identificación tributaría',
    value: DocumentType.NIT,
    selected: false
  },
  {
    text: 'CE - Cédula de extranjería',
    value: DocumentType.CE,
    selected: false
  },
  {
    text: 'TI - Tarjeta de identidad',
    value: DocumentType.TI,
    selected: false
  },
  {
    text: 'PAS - Pasaporte',
    value: DocumentType.PAS,
    selected: false
  },
  {
    text: 'CD - Carné diplomático',
    value: DocumentType.CD,
    selected: false
  }
];
