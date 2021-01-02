import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

import { UserService, OfferViewService, SelectService } from '../../../../../services';
import { Offer, OfferType, OfferDuration, User, SelectOption, SelectOptionCompany } from '../../../../../../models';

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

  @Input() offerEdited: Offer;
  isEdition = false;

  @Output() updatedEvent = new EventEmitter<any>();

  editor = ClassicEditor;

  offerType = Object.values(OfferType);
  offerDuration = Object.values(OfferDuration);

  listCountries: string[] = ['France', 'Espagne', 'Angleterre', 'Inde', 'Chine'];
  // TODO : Get countries otherwise, example: from https://github.com/apilayer/restcountries

  offerOnForm: Offer = new Offer();
  dateFromDate: Date = new Date();
  dateStart = new FormControl(moment());
  locationCountry: string;
  locationCity: string;

  sectorList: SelectOption[];
  selectedSectorId: string;

  softSkillsList: SelectOption[];
  selectedSoftSkillIdList = [];
  domainsList: SelectOption[];
  selectedDomainsIdList = [];

  companiesList: SelectOptionCompany[];

  currentUser: User;

  constructor(private offerViewService: OfferViewService,
              private userService: UserService,
              private selectService: SelectService,
              private router: Router,
              private matSnackBar: MatSnackBar,
              private matDialog: MatDialog) {
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    if (this.offerEdited) {
      this.offerOnForm = this.offerEdited;
      this.isEdition = true;
      this.locationCity = this.offerOnForm.location.split(',')[0];
      this.locationCountry = this.offerOnForm.location.split(',')[1].trim();
      this.selectedDomainsIdList = this.offerOnForm.domains.map(domain => domain._id);
      this.selectedSoftSkillIdList = this.offerOnForm.softSkills.map(softSkill => softSkill._id);
      this.selectedSectorId = this.offerOnForm.sector._id;
    } else {
      this.offerOnForm.description = '';
    }

    this.getSelectOptions();
  }

  // TODO : Refactor that function
  addOrEditOffer() {
    this.fixSector();
    this.fixDomainsAndSoftSkills();

    if (this.currentUser.username !== 'admin') {
      this.offerOnForm.company = {
        _id : this.currentUser.idCompany,
        display: this.currentUser.name,
        srcImg: this.currentUser.srcImage
      };
    }

    if (!this.isEdition) {
      this.offerOnForm.startDate = this.dateFromDate;
      this.offerOnForm.createdDate = new Date();
      this.offerOnForm.location = this.locationCity + ', ' + this.locationCountry;
      if (!this.checkCurrentOfferValidity()) {
        this.matSnackBar.open('Certaines informations sont incorrectes', null, { duration: 3000, panelClass: ['snack-bar-error'] });
        return;
      }
      this.offerViewService.addOffer(this.offerOnForm).subscribe(
          success => {
            this.router.navigate(['/profile']);
          }, error => {
            this.matSnackBar.open('Erreur avec le serveur : ' + error, null, { duration: 3000, panelClass: ['snack-bar-error'] });
          }
      );
    } else {
      this.offerOnForm.startDate = this.dateFromDate;
      this.offerOnForm.location = this.locationCity + ', ' + this.locationCountry;
      if (!this.checkCurrentOfferValidity()) {
        this.matSnackBar.open('Certaines informations sont incorrectes', null, { duration: 3000, panelClass: ['snack-bar-error'] });
        return;
      }
      this.offerViewService.editOffer(this.offerOnForm).subscribe(
          success => {
            this.updatedEvent.emit();
          }, error => {
            this.matSnackBar.open('Erreur avec le serveur : ' + error, null, { duration: 3000, panelClass: ['snack-bar-error'] });
          }
      );
    }
  }

  getSelectOptions() {
    this.selectService.getSoftSkills().subscribe(softSkills => {
      this.softSkillsList = softSkills;
    });
    this.selectService.getDomains().subscribe(domains => {
      this.domainsList = domains;
    });
    this.selectService.getCompaniesForSelectWithImg().subscribe(companies => {
      this.companiesList = companies;
    });
    this.selectService.getSectors().subscribe(sectors => {
      this.sectorList = sectors;
    });
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

  fixSector() {
    this.offerOnForm.sector = this.sectorList.find(sector => sector._id === this.selectedSectorId);
  }

  fixDomainsAndSoftSkills() {
    this.offerOnForm.softSkills = [];
    this.selectedSoftSkillIdList.forEach(selectedSoftSkillId => {
      this.offerOnForm.softSkills.push(this.softSkillsList.find(softSkill => softSkill._id === selectedSoftSkillId));
    });
    this.offerOnForm.domains = [];
    this.selectedDomainsIdList.forEach(selectedDomainId => {
      this.offerOnForm.domains.push(this.domainsList.find(domain => domain._id === selectedDomainId));
    });
  }

  checkCurrentOfferValidity(): boolean {
    return !(this.offerOnForm.title === ''
        || this.offerOnForm.sector === undefined
        || this.offerOnForm.type === undefined
        || this.offerOnForm.description === ''
        || this.offerOnForm.location === '');
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
