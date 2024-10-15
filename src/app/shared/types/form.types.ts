import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface FormSelectOption<T = string, V = string> {
  text: T;
  value: V;
  selected: boolean;
};

export type FormExtractTypes<K> = K extends FormControl<infer T> ? T : never;

export type FormDynamic<O extends object> = {
  [K in keyof O]: O[K];
}

export type FormGroupDynamic<O extends object> = {
  [K in keyof FormDynamic<O>]:
    [FormExtractTypes<FormDynamic<O>[K]>] |
    [FormExtractTypes<FormDynamic<O>[K]>, ...((control: FormDynamic<O>[K]) => ValidationErrors | null)[] | []] |
    [];
};
