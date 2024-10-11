import { PersonType } from '@shared/enums/person.enums';
import { FormSelectOption } from '@shared/types/form.types';

export type PersonTypeValue = FormSelectOption<'Seleccionar tipo de persona', null> | FormSelectOption<string, PersonType>;

export type DocumentTypeValue = FormSelectOption<'Seleccionar tipo de documento', null> | FormSelectOption<string, DocumentType>;
