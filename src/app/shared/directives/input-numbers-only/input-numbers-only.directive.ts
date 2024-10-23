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
        const correctValue = inputValue?.replace(/[^\d]/g, '') ?? '';
        if (inputValue !== correctValue) {
          this.#ngControl.control?.patchValue(correctValue, { emitEvent: false });
        }
      });
  }
}
