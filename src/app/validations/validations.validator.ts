import { FormControl, FormGroup } from '@angular/forms';

//Allow alphanumeric char and space only
export class TextFiledValidator {
  static validTextFiled(fc: FormControl) {
    if (fc.value != undefined && fc.value != '') {
      const regex = /^[0-9a-zA-Z ]+$/;
      if (regex.test(fc.value)) {
        return null;
      } else {
        return { validTextFiled: true };
      }
    } else {
      return null;
    }
  }
}

//Allow Numeric char only
export class NumericFiledValidator {
  static validNumericFiled(fc: FormControl) {
    if (fc.value != undefined && fc.value != '') {
      const regex = /[0-9]+/;

      if (regex.test(fc.value)) {
        return null;
      } else {
        return { validNumericFiled: true };
      }
    } else {
      return null;
    }
  }
}

//Allow char and space only
export class OnlyCharFiledValidator {
  static validOnlyCharFiled(fc: any) {
    if (fc.value != undefined && fc.value != '') {
      const regex = /^[a-zA-Z ]+$/;

      if (regex.test(fc.value)) {
        return null;
      } else {
        return { validOnlyCharFiled: true };
      }
    } else {
      return null;
    }
  }
}

//Allow Valid Email Only
export class EmailValidator {
  static validEmail(fc: FormControl) {
    if (fc.value != undefined && fc.value != '') {
      const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
      if (regex.test(fc.value)) {
        return null;
      } else {
        return { validEmail: true };
      }
    } else {
      return null;
    }
  }
}

//Not Allow whitespace only
//user will not be able to proceed futher by giving space.
export class NoWhiteSpaceValidator {
  //static noWhiteSpaceValidator(fc: FormControl) , if you want it to be strick type
  static noWhiteSpaceValidator(fc: any) {
    if (fc.value != undefined && fc.value != '' && fc.value != null) {
      const isWhiteSpace = fc.value.toString().trim().length === 0;
      if (!isWhiteSpace) {
        return null;
      } else {
        return { noWhiteSpaceValidator: true };
      }
    } else {
      return null;
    }
  }
}

// To check 2 fields equal or not
//like password and confirm password is same or not
//note this is not a Class like other Validators
export function MustMatchValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
