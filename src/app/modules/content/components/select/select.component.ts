import { Component, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { SELECT_CONTROL_VALUE_ACCESSOR } from '@core/providers/control-value.provider';
import { ElementAttributes } from '@shared/types/element.types';
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
  @HostBinding('class') readonly className = 'form__select';
  @Input() attributes!: ElementAttributes;
  @Input() options: FormSelectOption<any, any>[] = [];
  #currentOption!: FormSelectOption<any, any>;
  #onChanged!: Function;
  onTouched!: Function;
  disabled = false;

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
