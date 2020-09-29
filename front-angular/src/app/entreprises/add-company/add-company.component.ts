import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserCompanyService } from 'src/app/logging/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  isModalopen: boolean;
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private userCompanyService: UserCompanyService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      isStudent: [false],
      date_of_creation: ['', Validators.required],
      description: ['', Validators.required],
      taille: ['', Validators.required],
      location: ['', Validators.required],
      srcImage: [''],
      isPartner: []
    });
  }

  openOrClose() {
    this.isModalopen = !this.isModalopen;
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.userCompanyService.registerByAdmin(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.matSnackBar.open('Registration successful', null, { duration: 3000, panelClass: ['snack-bar-sucess'] });
          this.openOrClose();
          // TODO rafraichir juste le composant
          window.location.reload();
        },
        error => {
          this.matSnackBar.open(error, null, { duration: 3000, panelClass: ['snack-bar-error'] });
          this.loading = false;
        });
  }

}
