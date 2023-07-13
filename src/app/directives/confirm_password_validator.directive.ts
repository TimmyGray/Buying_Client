import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl):

  ValidationErrors | null => {

  const pass = control.get('password');
  const confirm = control.get('confirmPassword');

  const notEqual: boolean = pass != confirm && pass?.value !== confirm?.value;

  return (notEqual) ? { equalPass: notEqual } : null;

};

