import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';

import { CompanyService } from '../../../services';
import { Company } from '../../../../models';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;

  constructor(@Inject(MAT_DIALOG_DATA) public company: Company,
              private formBuilder: FormBuilder,
              private matSnackBar: MatSnackBar,
              private companyService: CompanyService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [this.company?.name, Validators.required],
      isStudent: [false],
      creationDate: [this.company?.creationDate, Validators.required],
      description: [this.company?.description, Validators.required],
      taille: [this.company?.taille, Validators.required],
      location: [this.company?.location, Validators.required],
      srcImage: [this.company?.srcImage],
      isPartner: []
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.companyService.addCompany(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.matSnackBar.open('Registration successful', null, { duration: 3000, panelClass: ['snack-bar-success'] });
          this.companyService.updateCompaniesEvent.next();
        },
        error => {
          this.matSnackBar.open(error, null, { duration: 3000, panelClass: ['snack-bar-error'] });
          this.loading = false;
        });
  }

}
