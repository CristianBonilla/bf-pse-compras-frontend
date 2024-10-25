import { AfterViewInit, DestroyRef, Directive, inject, OnInit } from '@angular/core';
import { NgControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: 'input[numbersOnly]'
})
export class InputNumbersOnlyDirective implements OnInit, AfterViewInit {
  readonly #ngControl = inject(NgControl);
  readonly #destroyRef = inject(DestroyRef);
  readonly #validators = [Validators.required, Validators.minLength(7)];

  ngOnInit() {
    this.#ngControl.control?.addValidators(this.#validators);
  }

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
