import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
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

  @Input() companyId;

  currentUser: User;

  avisForm: FormGroup;

  avisList: Avis[];

  loading = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private matSnackBar: MatSnackBar,
              private matDialog: MatDialog,
              private avisService: AvisService,
              private userService: UserService) { }

  // TODO : étoiles au lieu de l'input, ou au moins un select plus propre.
  ngOnInit() {
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });

    this.avisForm = this.formBuilder.group({
      description: ['', Validators.required],
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

    this.avisService.add(new Avis(this.avisForm, this.companyId))
      .pipe(first())
      .subscribe(
        data => {
          this.loadAllAvis();
          this.resetForm();
          this.matSnackBar.open('Avis ajouté avec succès', null, { duration: 3000, panelClass: ['snack-bar-success'] });
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
    this.avisService.getAllByCompanyId(this.companyId).subscribe(
      (avisArray: Avis[]) => {
        this.avisList = avisArray;
      },
      error => {
        this.matSnackBar.open(error, null, { duration: 3000, panelClass: ['snack-bar-error'] });
      }
    );
  }

  onDeleteEvent(avisId) {
    const dialogRef = this.matDialog.open(DeleteAvisComponent);

    dialogRef.afterClosed().subscribe(
        result => {
          if (result) {
            this.avisService.deleteById(avisId).subscribe(
                _ => {
                  this.loadAllAvis();
                  this.matSnackBar.open('Avis supprimé avec succès', null, { duration: 3000, panelClass: ['snack-bar-success'] });
                },
                error => {
                  this.matSnackBar.open(error, null, { duration: 3000, panelClass: ['snack-bar-error'] });
                }
            );
          }
        }
    );
  }
}

@Component({
  selector: 'app-delete-avis-dialog',
  template: `
  <h3 mat-dialog-title>Voulez-vous vraiment supprimer cette avis ?</h3>
  <div mat-dialog-actions align="end">
    <button mat-button [mat-dialog-close]="true">Supprimer</button>
    <button mat-button mat-dialog-close>Retour</button>
  </div>
  `,
})
export class DeleteAvisComponent {

  constructor() { }
}

