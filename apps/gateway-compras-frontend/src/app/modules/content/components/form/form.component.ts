import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'bf-pc-form',
  templateUrl: './form.component.html',
  styles: ``
})
export class FormComponent {
  @Input() formGroup!: FormGroup;
  @Output() readonly submitForm = new EventEmitter<void | MouseEvent>();

  handleSubmit(event: void | MouseEvent) {
    this.submitForm.emit(event);
  }
}
