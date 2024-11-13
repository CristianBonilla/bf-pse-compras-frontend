import { Component, HostBinding, inject, Injector, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlDirective, NgControl } from '@angular/forms';
import { SELECT_CONTROL_VALUE_ACCESSOR } from '@core/providers/control-value.provider';
import { ElementAttributes } from '@shared/types/element.types';
import { FormSelectOption } from '@shared/types/form.types';
import { from, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'bf-pc-select',
  templateUrl: './select.component.html',
  styles: ``,
  providers: [SELECT_CONTROL_VALUE_ACCESSOR]
})
export class SelectComponent implements ControlValueAccessor, OnDestroy {
  readonly #injector = inject(Injector);
  @HostBinding('class') readonly className = 'form__select';
  @Input() attributes!: ElementAttributes;
  @Input() options: FormSelectOption<string, any>[] = [];
  control!: FormControl<FormSelectOption<string, any>>;
  #onChanged!: (option: FormSelectOption<string, any>) => void;
  onTouched!: () => void;
  #currentOptionSubscription?: Subscription;

  ngOnInit() {
    const ngControl = this.#injector.get(NgControl, null, { self: true, optional: true });
    if (ngControl instanceof FormControlDirective) {
      this.control = ngControl.control;
    }
  }

  writeValue(_option?: FormSelectOption<string, any>) { }

  registerOnChange(fn: (option: FormSelectOption<string, any>) => void) {
    this.#onChanged = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState?(_disabled: boolean) { }

  handleOption(currentOption: FormSelectOption<string, any>) {
    if (!currentOption) {
      return;
    }
    this.#currentOptionSubscription = from(this.options)
      .pipe(
        filter(({ selected }) => selected),
      ).subscribe(option => {
        this.onTouched();
        option.selected = false;
        currentOption.selected = true;
        this.#onChanged(currentOption);
      });
  }

  ngOnDestroy() {
    this.#currentOptionSubscription?.unsubscribe();
  }
}
