import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../../services';
import { User } from '../../../models';


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
  private currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private matSnackBar: MatSnackBar) {

    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    if (this.currentUser) {
      this.router.navigate(['/']);
    }
    this.isStudent = true;
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateBirth: ['', Validators.required],
      email: [''],
      telephone: [''],
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
      email: [''],
      telephone: [''],
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

    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
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
  }
}
