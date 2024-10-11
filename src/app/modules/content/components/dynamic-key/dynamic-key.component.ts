import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'bf-pc-dynamic-key',
  templateUrl: './dynamic-key.component.html',
  styles: ``
})
export class DynamicKeyComponent {
  @HostBinding('class') readonly className = 'form__dynamic-key';
}
