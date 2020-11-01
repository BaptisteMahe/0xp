import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
const moment = _rollupMoment || _moment;

import { UserService, CompanyService, OfferViewService } from '../../../../../services';
import { Offer, User, Company, SelectOption } from 'src/models';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddOfferComponent implements OnInit {

  @Input() offreEdited: Offer;
  isEdition = false;

  @Output() updatedEvent = new EventEmitter<any>();

  editor = ClassicEditor;

  companiesList: Company[];

  typeList: string[] = ['Stage', 'Alternance', 'Premier emploi'];
  timeList: string[] = ['1-2 mois', '6 mois', '2 ans'];
  listCountries: string[] = ['France', 'Espagne', 'Angleterre', 'Inde', 'Chine'];

  offerOnForm: Offer = new Offer();
  dateFromDate: Date = new Date();
  dateStart = new FormControl(moment());
  locationCountry: string;
  locationCity: string;

  listSoftSkills: SelectOption[];
  listDomains: SelectOption[];
  sectorList: SelectOption[];

  currentUser: User;

  constructor(private offerViewService: OfferViewService,
              private userService: UserService,
              private companyService: CompanyService,
              private router: Router,
              private matSnackBar: MatSnackBar,
              private matDialog: MatDialog) {
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    if (this.offreEdited) {
      this.offerOnForm = this.offreEdited;
      this.isEdition = true;
      this.locationCity = this.offerOnForm.location.split(',')[0];
      this.locationCountry = this.offerOnForm.location.split(',')[1].trim();
    }
    fetch(this.offerViewService.apiUrl + '/select/sectors')
      .then(response => {
        response.json()
          .then(data => {
            this.sectorList = data.slice();
          });
      });
    fetch(this.offerViewService.apiUrl + '/select/softskills')
      .then(response => {
        response.json()
          .then(data => {
            this.listSoftSkills = data.slice();
          });
      });
    fetch(this.offerViewService.apiUrl + '/select/domaines')
      .then(response => {
        response.json()
          .then(data => {
            this.listDomains = data.slice();
          });
      });
    this.companyService.getAll().subscribe(
      value => {
        this.companiesList = value;
      },
      error => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  // TODO : Refactor that function
  addOrEditOffer() {

    if (this.currentUser.username !== 'admin') {
      this.offerOnForm.company = this.currentUser.name;
      this.offerOnForm.id_company = this.currentUser.idCompany;
      this.offerOnForm.srcImgCompany = this.currentUser.srcImage;
    } else {
      const company = this.companiesList.find(x => x._id === this.offerOnForm.id_company);
      this.offerOnForm.company = company.name;
      this.offerOnForm.id_company = company._id;
      this.offerOnForm.srcImgCompany = company.srcImage;
    }

    if (!this.isEdition) {
      this.offerOnForm.start_date = '' + this.dateFromDate.getTime();
      this.offerOnForm.created_date = '' + (new Date()).getTime(); // TODO : Changer les types pour que rien soit cassé même si ça fonctionne
      this.offerOnForm.location = this.locationCity + ', ' + this.locationCountry;
      if (!this.offerOnForm.isValid()) {
        this.matSnackBar.open('Certaines informations sont incorrectes', null, { duration: 3000, panelClass: ['snack-bar-error'] });
        return;
      }
      this.offerViewService.addOffer(this.offerOnForm).subscribe(
          sucess => {
            this.router.navigate(['/profile']);
          }, error => {
            this.matSnackBar.open('Erreur avec le serveur : ' + error, null, { duration: 3000, panelClass: ['snack-bar-error'] });
          }
      );
    } else {
      this.offerOnForm.start_date = '' + this.dateFromDate.getTime();
      this.offerOnForm.location = this.locationCity + ', ' + this.locationCountry;
      if (!this.offerOnForm.isValid()) {
        this.matSnackBar.open('Certaines informations sont incorrectes', null, { duration: 3000, panelClass: ['snack-bar-error'] });
        return;
      }
      this.offerViewService.editOffer(this.offerOnForm).subscribe(
          sucess => {
            this.updatedEvent.emit();
          }, error => {
            this.matSnackBar.open('Erreur avec le serveur : ' + error, null, { duration: 3000, panelClass: ['snack-bar-error'] });
          }
      );
    }
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.dateStart.value;
    ctrlValue.year(normalizedYear.year());
    this.dateStart.setValue(ctrlValue);
    this.dateFromDate.setUTCFullYear(this.dateStart.value._d.getUTCFullYear());
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dateStart.value;
    ctrlValue.month(normalizedMonth.month());
    this.dateStart.setValue(ctrlValue);
    datepicker.close();
    this.dateFromDate.setMonth(this.dateStart.value._d.getMonth());
  }

  onCloseEditionClick() {
    const dialogRef = this.matDialog.open(QuitEditionDialogContentComponent);

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.router.navigate(['/profile']);
        }
      });
  }
}

@Component({
  selector: 'app-delete-dialog-content',
  template: `
  <h3 mat-dialog-title>Voulez-vous vraiment abandonner l'édition de l'offre ?</h3>
  <div mat-dialog-actions align="end">
    <button mat-button [mat-dialog-close]="true">Abandonner</button>
    <button mat-button mat-dialog-close>Retour</button>
  </div>
  `,
})
export class QuitEditionDialogContentComponent {

  constructor() { }
}
