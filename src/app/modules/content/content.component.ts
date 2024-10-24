import { Component, inject } from '@angular/core';
import { LoaderService } from '@module/content/services/loader/loader.service';
import { StepperService } from '@module/content/services/stepper/stepper.service';

@Component({
  selector: 'bf-pc-content',
  templateUrl: './content.component.html',
  styles: ``
})
export class ContentComponent {
  readonly #loader = inject(LoaderService);
  readonly #stepper = inject(StepperService);
  readonly stepperFlow$ = this.#stepper.stepperFlow$;
  readonly loading$ = this.#loader.loading$;
}
