import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { CompanyService } from '../../../services';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  isModalOpen: boolean;
  registerForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private matSnackBar: MatSnackBar,
              private companyService: CompanyService,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      isStudent: [false],
      creationDate: ['', Validators.required],
      description: ['', Validators.required],
      taille: ['', Validators.required],
      location: ['', Validators.required],
      srcImage: [''],
      isPartner: []
    });
  }

  openOrClose() {
    this.isModalOpen = !this.isModalOpen;
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
          this.matSnackBar.open('Registration successful', null, { duration: 3000, panelClass: ['snack-bar-sucess'] });
          this.openOrClose();
          this.companyService.newCompanyEvent.next();
        },
        error => {
          this.matSnackBar.open(error, null, { duration: 3000, panelClass: ['snack-bar-error'] });
          this.loading = false;
        });
  }

}
