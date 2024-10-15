import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors } from '@angular/forms';
import { LoginForm } from '@models/login.model';
import { DOCUMENT_TYPE, PERSON_TYPE } from '@shared/constants/login.constants';
import { PersonType } from '@shared/enums/person.enums';
import { FormGroupDynamic, FormSelectOption } from '@shared/types/form.types';
import { DocumentTypeValue, PersonTypeValue } from '@shared/types/login.types';

function personTypeRequired(control: FormControl<PersonTypeValue>): ValidationErrors | null {
  const { selected, value } = control.value;

  return selected && !value ? { required: true } : null;
}

function documentTypeRequired(control: FormControl<DocumentTypeValue>): ValidationErrors | null {
  const { selected, value } = control.value;

  return selected && !value ? { required: true } : null;
}

@Component({
  selector: 'bf-pc-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  readonly recoveryLink = 'https://www.bancofalabella.com.co/autoadhesion';
  readonly #formBuilder = inject(FormBuilder);
  readonly PERSON_TYPE = PersonType;
  readonly personTypeOptions = PERSON_TYPE;
  readonly documentTypeOptions = DOCUMENT_TYPE;
  personTypeValue: PersonTypeValue = this.personTypeOptions[0];
  readonly loginForm = this.#formBuilder.group<FormGroupDynamic<LoginForm>>({
    personType: [this.personTypeValue, personTypeRequired],
    documentType: [this.documentTypeOptions[0], documentTypeRequired],
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

  get bussinessGroupControl() {
    return this.loginForm.controls.businessGroup;
  }

  get tokenKeyControl() {
    return this.loginForm.controls.tokenKey;
  }

  login() {}

  personTypeChange(personType: PersonTypeValue) {
    this.personTypeValue = personType;
    this.#updateFormGroup();
  }

  #updateFormGroup() {
    switch (this.personTypeValue.value) {
      case PersonType.Legal:
        this.loginForm.addControl('businessGroup', this.#formBuilder.control(null));
        this.loginForm.addControl('tokenKey', this.#formBuilder.control(null));
        break;
      default:
        this.loginForm.removeControl('businessGroup');
        this.loginForm.removeControl('tokenKey');
        break;
    }
  }
}
