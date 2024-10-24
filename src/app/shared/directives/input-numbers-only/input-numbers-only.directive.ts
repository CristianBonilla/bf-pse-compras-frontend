import { AfterViewInit, DestroyRef, Directive, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: 'input[numbersOnly]'
})
export class InputNumbersOnlyDirective implements AfterViewInit {
  #ngControl = inject(NgControl);
  #destroyRef = inject(DestroyRef);

  ngAfterViewInit() {
    this.#ngControl.valueChanges
      ?.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((inputValue?: string) => {
        const [first, second] = inputValue?.match(/\d{1,3}/g) ?? [];
        if (first && second && (first + second).length <= 6) {
          this.#ngControl.control?.patchValue(`${first} ${second}`, { emitEvent: false });
        } else if (first && !second) {
          this.#ngControl.control?.patchValue(first, { emitEvent: false });
        } else {
          this.#ngControl.control?.patchValue(inputValue?.replace(/\D/g, '') ?? '', { emitEvent: false });
        }
      });
  }
}
