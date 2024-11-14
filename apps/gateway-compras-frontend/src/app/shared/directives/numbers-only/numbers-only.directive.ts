import { AfterViewInit, DestroyRef, Directive, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, NgControl } from '@angular/forms';
import { filter, map } from 'rxjs/operators';

@Directive({
  selector: 'input[bfPcNumbersOnly]'
})
export class NumbersOnlyDirective implements OnInit, AfterViewInit {
  readonly #ngControl = inject(NgControl);
  readonly #destroyRef = inject(DestroyRef);
  #control!: FormControl<string | null> | null;

  ngOnInit() {
    this.#control = this.#ngControl.control as FormControl<string | null> | null;
  }

  ngAfterViewInit() {
    this.#control?.valueChanges
      .pipe(
        map(inputValue => [inputValue, inputValue?.replace(/\D/g, '') ?? '']),
        filter(([inputValue, correctValue]) => inputValue !== correctValue),
        takeUntilDestroyed(this.#destroyRef)
      ).subscribe(([_, correctValue]) => {
        this.#control?.patchValue(correctValue, { emitEvent: false });
      });
  }
}
