import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bf-pc-voucher',
  templateUrl: './voucher.component.html',
  styles: ``
})
export class VoucherComponent {
  readonly #router = inject(Router);

  goBack() {
    this.#router.navigate(['/']);
  }
}
