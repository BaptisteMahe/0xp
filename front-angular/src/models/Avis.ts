import { FormGroup } from '@angular/forms';

export class Avis {
  // tslint:disable-next-line:variable-name
  _id?: string;
  companyId: string;
  noteGenerale: number;
  noteAmbiance: number;
  noteInteret: number;
  noteEncadrt: number;
  description: string;

  constructor(form: FormGroup, companyId: string) {
    this.companyId = companyId;
    Object.keys(form.controls).forEach(key => {
      this[key] = form.controls[key].value;
    });
  }
}
