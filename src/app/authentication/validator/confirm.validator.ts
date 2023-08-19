import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
  
      if (password !== confirmPassword) {
        // Set the 'passwordMismatch' error for confirmPassword control
        control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }
  
      return null;
    };
  }
  