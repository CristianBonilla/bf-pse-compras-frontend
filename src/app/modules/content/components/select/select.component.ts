import { Attribute, Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { SELECT_CONTROL_VALUE_ACCESSOR } from '@core/providers/control-value.provider';
import { FormSelectOption } from '@shared/types/form.types';
import { from } from 'rxjs';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'bf-pc-select',
  templateUrl: './select.component.html',
  styles: ``,
  providers: [SELECT_CONTROL_VALUE_ACCESSOR]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: FormSelectOption<any, any>[] = [];
  #onChanged!: Function;
  onTouched!: Function;
  #currentOption!: FormSelectOption<any, any>;

  get handleOption() {
    return this.#currentOption;
  }
  set handleOption(currentOption: FormSelectOption<any, any>) {
    if (!currentOption) {
      return;
    }
    from(this.options)
      .pipe(
        first(({ selected }) => selected),
        take(1)
      ).subscribe(option => {
        this.onTouched();
        option.selected = false;
        currentOption.selected = true;
        this.#onChanged(currentOption);
      });
  }

  constructor(
    @Attribute('id') public id: string,
    @Attribute('name') public name?: string,
    @Attribute('autocomplete') public autocomplete?: 'on' | 'off',
    @Attribute('disabled') public disabled?: boolean
  ) { }

  writeValue(option: FormSelectOption<any, any>) {
    this.#currentOption = option;
  }

  registerOnChange(fn: Function) {
    this.#onChanged = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouched =  fn;
  }

  setDisabledState?(disabled: boolean) {
    this.disabled = disabled;
  }
}
