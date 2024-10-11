import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginFormGroup } from '@models/form';

@Component({
  selector: 'bf-pc-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly loginForm = this.#formBuilder.group<LoginFormGroup>({
    personType: [null],
    documentType: [null],
    documentNumber: [null],
    internetKey: [null]
  });

  get personType() {
    return this.loginForm.controls['personType'];
  }

  get documentType() {
    return this.loginForm.controls['documentType'];
  }

  get documentNumber() {
    return this.loginForm.controls['documentNumber'];
  }

  get internetKey() {
    return this.loginForm.controls['internetKey'];
  }

  login() {}
}
