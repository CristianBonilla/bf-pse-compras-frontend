import { DocumentType } from '@shared/enums/document.enums';
import { FormSelectOption } from '@shared/types/form.types';

export const DOCUMENT_TYPE: [FormSelectOption<'Seleccionar tipo de documento', null>, ...FormSelectOption<string, DocumentType>[]] = [
  {
    text: 'Seleccionar tipo de documento',
    value: null,
    selected: true,
  },
  {
    text: 'CC',
    value: DocumentType.CC,
    selected: false
  },
  {
    text: 'NIT',
    value: DocumentType.NIT,
    selected: false
  },
  {
    text: 'CE',
    value: DocumentType.CE,
    selected: false
  },
  {
    text: 'TI',
    value: DocumentType.TI,
    selected: false
  },
  {
    text: 'PAS',
    value: DocumentType.PAS,
    selected: false
  },
  {
    text: 'CD',
    value: DocumentType.CD,
    selected: false
  }
];
