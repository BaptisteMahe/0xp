import { User } from './../../../models/user';
import { AuthenticationService } from './../../logging/services/authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AvisService } from '../avis.service';
import { first } from 'rxjs/operators';
import { Avis } from '../../../models';

@Component({
  selector: 'app-avis-company',
  templateUrl: './avis-company.component.html',
  styleUrls: ['./avis-company.component.scss']
})
export class AvisCompanyComponent implements OnInit {

  // TODO : seul un étudiant connecté peut déposer un avis
  @Input() idCompany;
  avisForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  avisList: Avis[];
  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private avisService: AvisService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  // TODO : étoiles au lieu de l'input, ou au moins un select plus propre.
  ngOnInit() {
    this.avisForm = this.formBuilder.group({
      avis: ['', Validators.required],
      noteGenerale: ['', Validators.required],
      noteInteret: ['', Validators.required],
      noteAmbiance: ['', Validators.required],
      noteEncadrt: ['', Validators.required]
    });
    this.returnUrl = this.router.url;

    this.avisService.getAllByCompanyId(this.idCompany).subscribe(
      value => {
        this.avisList = value;
      },
      error => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  get f() { return this.avisForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.avisForm.invalid) {
      return;
    }

    this.avisService.add(this.f, this.idCompany)
      .pipe(first())
      .subscribe(
        data => {
          //this.router.navigate([this.returnUrl]);
          // TODO rafraichir juste le composant
          window.location.reload();
        },
        error => {
          this.matSnackBar.open(error, null, { duration: 3000, panelClass: ['snack-bar-error'] });
          this.loading = false;
        });
  }

}
