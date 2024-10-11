import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginForm } from '@models/login.model';
import { DOCUMENT_TYPE } from '@shared/constants/document.constants';
import { PERSON_TYPE } from '@shared/constants/person.constants';
import { FormExtractTypes, FormGroupDynamic } from '@shared/types/form.types';
import { first, from } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'bf-pc-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly personType = PERSON_TYPE;
  readonly documentType = DOCUMENT_TYPE;
  readonly loginForm = this.#formBuilder.group<FormGroupDynamic<LoginForm>>({
    personType: [this.personType[0]],
    documentType: [this.documentType[0]],
    documentNumber: [null],
    internetKey: [null]
  });

  get personTypeControl() {
    return this.loginForm.controls.personType;
  }

  get documentTypeControl() {
    return this.loginForm.controls.documentType;
  }

  get documentNumberControl() {
    return this.loginForm.controls.documentNumber;
  }

  get internetKeyControl() {
    return this.loginForm.controls.internetKey;
  }

  ngOnInit() {

  }

  login() {}

  personTypeChange(option: FormExtractTypes<typeof this.personTypeControl>) {
    if (!option) {
      return;
    }
    from(this.personType)
      .pipe(
        first(({ selected }) => selected),
        take(1)
      )
      .subscribe(personType => {
        personType.selected = false;
        option.selected = true;
      });
  }

  documentTypeChange(option: FormExtractTypes<typeof this.documentTypeControl>) {
    if (!option) {
      return;
    }
    from(this.documentType)
      .pipe(
        first(({ selected }) => selected),
        take(1)
      )
      .subscribe(documentType => {
        documentType.selected = false;
        option.selected = true;
      });
  }
}
