import { UserCompany } from './../../../models/userCompany';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, UserService, UserCompanyService } from '../services';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  isStudent: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private userCompanyService: UserCompanyService,
    private matSnackBar: MatSnackBar,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.isStudent = true;
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateBirth: ['', Validators.required],
      contactMail: [''],
      contactTel: [''],
      location: ['', Validators.required],
      softSkills: [''],
      interestCompany: [''],
      interestDomain: [''],
      isStudent: [true]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  registerStudent = (e) => {
    this.isStudent = true;
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateBirth: ['', Validators.required],
      contactMail: [''],
      contactTel: [''],
      location: ['', Validators.required],
      softSkills: [''],
      interestCompany: [''],
      interestDomain: [''],
      isStudent: [true]
    });
  }

  registerCompany = (e) => {
    this.isStudent = false;
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isStudent: [false],
      creationDate: ['', Validators.required],
      description: ['', Validators.required],
      taille: ['', Validators.required],
      location: ['', Validators.required],
      srcImage: ['']
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    if (this.isStudent) {
      this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.matSnackBar.open('Registration successful', null, { duration: 3000, panelClass: ['snack-bar-sucess'] });
            this.router.navigate(['/login']);
          },
          error => {
            this.matSnackBar.open(error, null, { duration: 3000, panelClass: ['snack-bar-error'] });
            this.loading = false;
          });
    } else {
      this.userCompanyService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.matSnackBar.open('Registration successful', null, { duration: 3000, panelClass: ['snack-bar-sucess'] });
            this.router.navigate(['/login']);
          },
          error => {
            this.matSnackBar.open(error, null, { duration: 3000, panelClass: ['snack-bar-error'] });
            this.loading = false;
          });
    }
  }
}
