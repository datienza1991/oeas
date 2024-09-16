import { UntypedFormControl } from '@angular/forms';

export const confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
  if (!control.value) {
    return { required: true };
  } else if (control.value !== control?.parent?.get('newpassword')?.value) {
    return { confirm: true, error: true };
  }
  return {};
};
