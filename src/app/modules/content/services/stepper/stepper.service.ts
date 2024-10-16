import { Injectable } from '@angular/core';
import { Flow } from '@shared/enums/stepper.enums';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class StepperService {
  readonly #stepperFlow = new BehaviorSubject<Flow | null>(null);
  readonly stepperFlow$ = this.#stepperFlow.asObservable();

  update(flow: Flow) {
    this.#stepperFlow.next(flow);
  }
}
