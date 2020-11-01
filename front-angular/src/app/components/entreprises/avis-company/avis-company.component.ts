import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';

import { UserService, AvisService } from '../../../services';
import { Avis, User } from '../../../../models';

@Component({
  selector: 'app-avis-company',
  templateUrl: './avis-company.component.html',
  styleUrls: ['./avis-company.component.scss']
})
export class AvisCompanyComponent implements OnInit {

  @Input() idCompany;

  currentUser: User;

  avisForm: FormGroup;

  avisList: Avis[];

  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private avisService: AvisService,
    private userService: UserService) { }

  // TODO : étoiles au lieu de l'input, ou au moins un select plus propre.
  ngOnInit() {
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });

    this.avisForm = this.formBuilder.group({
      avis: ['', Validators.required],
      noteGenerale: ['', Validators.required],
      noteInteret: ['', Validators.required],
      noteAmbiance: ['', Validators.required],
      noteEncadrt: ['', Validators.required]
    });
    this.loadAllAvis();
  }

  onSubmit() {
    if (this.avisForm.invalid || !this.currentUser) {
      return;
    }

    this.avisService.add(this.avisForm.controls, this.idCompany)
      .pipe(first())
      .subscribe(
        data => {
          this.loadAllAvis();
          this.resetForm();
        },
        error => {
          this.matSnackBar.open(error, null, { duration: 3000, panelClass: ['snack-bar-error'] });
          this.loading = false;
        });
  }

  resetForm() {
    this.avisForm.reset();
    this.cleanValidators();
  }

  cleanValidators() {
    Object.keys(this.avisForm.controls).forEach(key => {
      this.avisForm.controls[key].setErrors(null);
    });
  }

  loadAllAvis() {
    this.avisService.getAllByCompanyId(this.idCompany).subscribe(
      (value: Avis[]) => {
        this.avisList = value;
      },
      error => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

}
