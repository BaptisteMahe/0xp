import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';

import { UserService } from '../../../services';
import { User, studentRegisterForm, companyRegisterForm, CompanyCategories } from '../../../../models';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  activeRegisterForm: FormGroup;
  studentRegisterForm: FormGroup;
  companyRegisterForm: FormGroup;

  companyCategories = CompanyCategories;

  loading = false;

  logoAsBase64: string;
  fileReader = new FileReader();

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      if (user) {
        this.router.navigate(['/']);
      }
    });
    this.studentRegisterForm = this.formBuilder.group(studentRegisterForm);
    this.companyRegisterForm = this.formBuilder.group(companyRegisterForm);

    this.activeRegisterForm = this.studentRegisterForm;
  }

  onSelectedTabChange(event) {
    if (event.index === 0) {
      this.activeRegisterForm = this.studentRegisterForm;
    } else if (event.index === 1) {
      this.activeRegisterForm = this.companyRegisterForm;
    }
  }

  onSubmit() {
    if (this.activeRegisterForm.invalid) {
      return;
    }
    this.loading = true;

    this.userService.register({...this.activeRegisterForm.value, srcImage: this.logoAsBase64})
      .pipe(first())
      .subscribe(
        data => {
          this.matSnackBar.open('Registration successful', null, { duration: 3000, panelClass: ['snack-bar-success'] });
          this.router.navigate(['/login']);
        },
        error => {
          this.matSnackBar.open(error, null, { duration: 3000, panelClass: ['snack-bar-error'] });
          this.loading = false;
        });
  }

  onLogoReady(event) {
    this.logoAsBase64 = event;
  }
}
