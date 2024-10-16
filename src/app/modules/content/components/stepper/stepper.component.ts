import { Component, HostBinding, inject } from '@angular/core';
import { StepperService } from '@module/content/services/stepper/stepper.service';
import { Flow } from '@shared/enums/stepper.enums';

@Component({
  selector: 'bf-pc-stepper',
  templateUrl: './stepper.component.html',
  styles: ``
})
export class StepperComponent {
  @HostBinding('class') readonly className = 'stepper';
  readonly FLOW = Flow;
  readonly #stepper = inject(StepperService);
  readonly stepperFlow$ = this.#stepper.stepperFlow$;
}
