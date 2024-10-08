import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'bf-pc-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly loginForm = this.#formBuilder.group({});

  login() {}
}
