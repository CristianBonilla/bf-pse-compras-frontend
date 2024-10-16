import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'bf-pc-stepper',
  templateUrl: './stepper.component.html',
  styles: ``
})
export class StepperComponent {
  @HostBinding('class') readonly className = 'stepper';
}
