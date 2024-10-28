import { AfterViewInit, DestroyRef, Directive, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, NgControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Directive({
  selector: 'input[dynamicKey]'
})
export class DynamicKeyDirective implements OnInit, AfterViewInit {
  readonly #ngControl = inject(NgControl);
  readonly #destroyRef = inject(DestroyRef);
  readonly #dynamicKeyLength = 6;
  readonly #validators = [Validators.required, Validators.minLength(7)];
  #control!: FormControl<string | null> | null;

  ngOnInit() {
    this.#control = this.#ngControl.control as FormControl<string | null> | null;
    this.#control?.addValidators(this.#validators);
  }

  ngAfterViewInit() {
    this.#control?.valueChanges
      .pipe(
        map(dynamicKey => this.#getDynamicKey(dynamicKey)),
        takeUntilDestroyed(this.#destroyRef)
      ).subscribe(dynamicKey => {
        this.#control?.patchValue(dynamicKey, { emitEvent: false });
      });
  }

  #getDynamicKey(dynamicKey: string | null) {
    const [firstPart = null, secondPart = null] = dynamicKey?.match(/\d{1,3}/g) ?? [];
    if (!!(firstPart && secondPart) && (firstPart + secondPart).length <= this.#dynamicKeyLength) {
      return `${firstPart} ${secondPart}`;
    } else if (!!firstPart && !secondPart) {
      return firstPart;
    } else {
      return null;
    }
  }
}
