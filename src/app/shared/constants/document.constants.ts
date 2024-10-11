import { DocumentType } from '@shared/enums/document.enum';
import { FormOption } from '@shared/types/form.types';

export const DOCUMENT_TYPE: (FormOption<'Seleccionar tipo de documento', null> | FormOption<string, DocumentType>)[] = [
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
