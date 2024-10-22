import { AfterViewInit, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from '@models/login.model';
import { DOCUMENT_TYPE, PERSON_TYPE } from '@shared/constants/login.constants';
import { PersonType } from '@shared/enums/person.enums';
import { FormGroupDynamic } from '@shared/types/form.types';
import { PersonTypeValue } from '@shared/types/login.types';
import { selectRequired } from '@shared/utils/validators/select.validator';

@Component({
  selector: 'bf-pc-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements AfterViewInit {
  readonly #router = inject(Router);
  readonly recoveryLink = 'https://www.bancofalabella.com.co/autoadhesion';
  readonly #formBuilder = inject(FormBuilder);
  readonly PERSON_TYPE = PersonType;
  readonly personTypeOptions: PersonTypeValue[] = [
    {
      ...PERSON_TYPE[1],
      selected: true
    },
    ...PERSON_TYPE.slice(2)
  ];
  readonly documentTypeOptions = DOCUMENT_TYPE;
  personTypeValue: PersonTypeValue = this.personTypeOptions[0];
  readonly loginForm = this.#formBuilder.group<FormGroupDynamic<LoginForm>>({
    personType: [this.personTypeValue, selectRequired],
    documentType: [this.documentTypeOptions[0], selectRequired],
    documentNumber: [null, Validators.required],
    internetKey: [null, Validators.required]
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

  ngAfterViewInit() {
    this.personTypeControl.patchValue(this.personTypeOptions[0]);
  }

  login() {
    if (this.loginForm.valid) {
      this.#router.navigate(['transaction']);
    }
  }

  cancel() {
    this.#router.navigate(['/']);
  }

  personTypeChange(personType: PersonTypeValue) {
    this.personTypeValue = personType;
    this.#updateFormGroup();
    this.documentTypeControl.patchValue(this.documentTypeOptions[0]);
    this.documentNumberControl.patchValue(null);
    this.internetKeyControl.patchValue(null);
  }

  #updateFormGroup() {
    switch (this.personTypeValue.value) {
      case PersonType.Legal:
        this.loginForm.addControl('businessGroup', this.#formBuilder.control(null, {
          validators: Validators.required
        }));
        this.loginForm.addControl('tokenKey', this.#formBuilder.control(null, {
          validators: Validators.required
        }));
        break;
      default:
        this.loginForm.removeControl('businessGroup');
        this.loginForm.removeControl('tokenKey');
        break;
    }
  }
}
