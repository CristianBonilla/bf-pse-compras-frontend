import { FormControl, ValidatorFn } from '@angular/forms';

export interface FormOption<T = string, V = string> {
  text: T;
  value: V;
};

export type FormExtractTypes<K> = K extends FormControl<infer T> ? T : never;

export type FormDynamic<O extends object> = {
  [K in keyof O]: FormControl<O[K]>;
}

export type FormGroupDynamic<O extends object> = {
  [K in keyof FormDynamic<O>]:
    FormDynamic<O> |
    [FormExtractTypes<FormDynamic<O>[K]> | null] |
    [FormExtractTypes<FormDynamic<O>[K]> | null, ...ValidatorFn[] | []] |
    [];
};
