import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { Observable } from 'rxjs';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
const moment = _rollupMoment || _moment;

import { UserService, OfferService, SelectService, CompanyService, DocumentService } from '../../../../../services';
import {
  Offer,
  OfferType,
  OfferDuration,
  User,
  SelectOption,
  SelectOptionCompany,
  Company,
  Document,
  StudentTypes
} from '../../../../../../models';

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

  loading = false;

  @Output() updatedEvent = new EventEmitter<any>();

  editor = ClassicEditor;

  offerType = Object.values(OfferType);
  offerDuration = Object.values(OfferDuration);
  offerStudentTypes = StudentTypes;

  listCountries: string[] = ['France', 'Espagne', 'Angleterre', 'Inde', 'Chine'];
  // TODO : Get countries otherwise, example: from https://github.com/apilayer/restcountries

  offerOnForm: Offer = {} as Offer;
  dateFromDate: Date = new Date();
  dateStart = new FormControl(moment());
  locationCountry: string;
  locationCity: string;

  sectorList: SelectOption[];
  selectedSectorId: string;

  domainsList: SelectOption[];
  selectedDomainsIdList = [];

  companiesList: SelectOptionCompany[];

  oldOfferPdf: Document;
  newOfferPdf: Document;

  currentUser: User;

  constructor(private offerViewService: OfferService,
              private userService: UserService,
              private selectService: SelectService,
              private companyService: CompanyService,
              private documentService: DocumentService,
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
      this.selectedSectorId = this.offerOnForm.sector._id;
      if (this.offerOnForm.pdfId) {
        this.documentService.getById(this.offerOnForm.pdfId).subscribe((pdf: Document) => {
          this.oldOfferPdf = pdf;
        });
      }
    } else {
      this.offerOnForm.description = '';
    }

    this.getSelectOptions();

    if (this.currentUser.type === 'company') {
      this.companyService.getById(this.currentUser.companyId).subscribe((company: Company) => {
        this.offerOnForm.company = {
          _id : company._id,
          display: company.name,
          srcImg: company.srcImage,
          isPartner: company.isPartner
        };
      });
    } else if (this.currentUser.type === 'admin' && !this.offerEdited) {
      this.offerOnForm.company = { } as SelectOptionCompany;
    }
  }

  onSubmit() {
    this.loading = true;
    this.fixSectorAndCompany();
    this.fixDomains();

    this.offerOnForm.startDate = this.dateFromDate;
    this.offerOnForm.location = this.locationCity + ', ' + this.locationCountry;

    if (this.checkCurrentOfferValidity()) {
      const updatePdfObs = this.updatePdf();
      if (updatePdfObs) {
        updatePdfObs.subscribe(newPdfId => {
          if (newPdfId === null){
          } else {
            this.offerOnForm.pdfId = newPdfId;
          }
          this.addOrEditOffer();
          }, error => {
          this.matSnackBar.open('Il y a eu une erreur avec le pdf', null, { duration: 3000, panelClass: ['snack-bar-error'] });
        });
      } else {
        this.addOrEditOffer();
      }
    } else {
      this.matSnackBar.open('Certaines informations sont incorrectes', null, { duration: 3000, panelClass: ['snack-bar-error'] });
    }
  }

  addOrEditOffer() {
    this.offerOnForm.isValidated = this.currentUser.type === 'admin';
    if (!this.isEdition) {
      this.offerOnForm.createdDate = new Date();
      this.offerViewService.addOffer(this.offerOnForm).subscribe(
          success => {
            this.matSnackBar.open('Offre ajoutée avec succés', null, { duration: 3000, panelClass: ['snack-bar-success'] });
            this.router.navigate(['/profile'], {});
          }, error => {
            this.matSnackBar.open('Erreur avec le serveur : ' + error, null, { duration: 3000, panelClass: ['snack-bar-error'] });
          }
      );
    } else {
      this.offerViewService.editOffer(this.offerOnForm).subscribe(
          success => {
            this.matSnackBar.open('Offre modifiée avec succés', null, { duration: 3000, panelClass: ['snack-bar-success'] });
            this.updatedEvent.emit();
          }, error => {
            this.matSnackBar.open('Erreur avec le serveur : ' + error, null, { duration: 3000, panelClass: ['snack-bar-error'] });
          }
      );
    }
  }

  updatePdf(): Observable<string> {
    if (this.newOfferPdf) {
      if (this.newOfferPdf._id === 'delete' && this.oldOfferPdf?._id) {
        delete this.offerOnForm.pdfId;
        return this.documentService.deleteById(this.oldOfferPdf._id);
      } else if (this.oldOfferPdf?._id) {
        return this.documentService.update({...this.newOfferPdf, _id: this.oldOfferPdf._id});
      } else {
        return this.documentService.add(this.newOfferPdf);
      }
    } else {
      return null;
    }
  }

  getSelectOptions() {
    this.selectService.getDomains().subscribe(domains => {
      this.domainsList = domains;
    });
    this.selectService.getCompaniesForSelect().subscribe(companies => {
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

  fixSectorAndCompany() {
    this.offerOnForm.sector = this.sectorList.find(sector => sector._id === this.selectedSectorId);
    if (this.currentUser.type === 'admin') {
      this.offerOnForm.company = this.companiesList.find(company => company._id === this.offerOnForm.company._id);
    }
  }

  fixDomains() {
    this.offerOnForm.domains = [];
    this.selectedDomainsIdList.forEach(selectedDomainId => {
      this.offerOnForm.domains.push(this.domainsList.find(domain => domain._id === selectedDomainId));
    });
  }

  checkCurrentOfferValidity(): boolean {
    return !(this.offerOnForm.title === ''
        || this.offerOnForm.sector === undefined
        || this.offerOnForm.type === undefined
        || this.offerOnForm.location === '');
  }

  onPdfReady(event: Document) {
    this.loading = false;
    this.newOfferPdf = event;
  }

  onPdfLoading(){
    this.loading = true;
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
