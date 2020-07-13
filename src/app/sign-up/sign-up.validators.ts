import {FormGroup, ValidatorFn} from '@angular/forms';


export const nameInPasswordValidator: ValidatorFn = (formGroup: FormGroup) => {
  if (passwordContainsName(formGroup)) {

    // required to make form invalid
    formGroup.controls.password.setErrors({passwordContainsName: true});

    return {passwordContainsName: true};
  }
  return null;
};

export function passwordContainsName(form: FormGroup): boolean {

  const password = form.controls.password.value as string;
  const lastName = form.controls.lastName.value as string;
  const firstName = form.controls.firstName.value as string;

  if (password.length === 0) {
    return false;
  }

  if (lastName.length > 0) {
    if (password.toLowerCase().indexOf(lastName.toLowerCase()) > -1) {
      return true;
    }
  }

  if (firstName.length > 0) {
    if (password.toLowerCase().indexOf(firstName.toLowerCase()) > -1) {
      return true;
    }
  }

  return false;
}
