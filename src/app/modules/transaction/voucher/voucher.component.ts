import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepperService } from '@module/content/services/stepper/stepper.service';
import { Flow } from '@shared/enums/stepper.enums';

@Component({
  selector: 'bf-pc-voucher',
  templateUrl: './voucher.component.html',
  styles: ``
})
export class VoucherComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #stepper = inject(StepperService);

  ngOnInit() {
    this.#stepper.update(Flow.Voucher);
  }

  download() {
    this.#router.navigate(['/']);
  }
}
