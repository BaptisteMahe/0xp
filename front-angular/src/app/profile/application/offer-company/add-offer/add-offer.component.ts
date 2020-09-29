import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { OfferViewService } from 'src/app/offers/offerView.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Offer } from 'src/models/Offer';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { MatDatepicker } from '@angular/material';
import { SelectOption } from 'src/models/SelectOption';
import { AuthenticationService } from 'src/app/logging/services';
import { User } from 'src/models/user';
import { CompanyService } from '../../../../services/company.service';
import { Company } from 'src/models';
const moment = _rollupMoment || _moment;

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
  isEdition: Boolean = false;

  editor = ClassicEditor;

  companiesList: Company[];

  typeList: string[] = ['Stage', 'Alternance', 'Premier emploi'];
  timeList: string[] = ['1-2 mois', '6 mois', '2 ans'];
  sectorList: SelectOption[];
  listCountries: string[] = ['France', 'Espagne', 'Angleterre', 'Inde', 'Chine'];

  offerOnForm: Offer = new Offer();
  dateFromDate: Date = new Date();
  dateStart = new FormControl(moment());
  locationCountry: String;
  locationCity: String;

  listSoftSkills: SelectOption[];
  softSkillForm: FormGroup;

  listDomains: SelectOption[];
  domainsForm: FormGroup;
  modalSave = false;
  errorOnForm = false;

  currentUser: any;
  constructor(private offerViewService: OfferViewService,
    private authenticationService: AuthenticationService,
    private companyService: CompanyService,
    private router: Router) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
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
    this.softSkillForm = new FormGroup({
      selected: new FormControl(this.listSoftSkills)
    });
    this.domainsForm = new FormGroup({
      selected: new FormControl(this.listSoftSkills)
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

  addOrEditOffer() {

    if (this.currentUser.username !== 'admin') {
      this.offerOnForm.company = this.currentUser.name;
      this.offerOnForm.id_company = this.currentUser.idCompany;
      this.offerOnForm.srcImgCompany = this.currentUser.photo;
    } else {
      const company = this.companiesList.find(x => x._id === this.offerOnForm.id_company);
      this.offerOnForm.company = company.name;
      this.offerOnForm.id_company = company._id;
      this.offerOnForm.srcImgCompany = company.srcImage;
    }

    if (!this.isEdition) {
      this.offerOnForm.start_date = '' + this.dateFromDate.getTime();
      this.offerOnForm.created_date = '' + (new Date()).getTime(); //TODO : Changer les types pour que rien soit cassé même si ça fonctionne
      this.offerOnForm.location = this.locationCity + ', ' + this.locationCountry;
      if (!this.offerOnForm.isValid()) {
        this.errorOnForm = true;
        return;
      }
      this.offerViewService.addOffer(this.offerOnForm);
    } else {
      this.offerOnForm.start_date = '' + this.dateFromDate.getTime();
      this.offerOnForm.location = this.locationCity + ', ' + this.locationCountry;
      if (!this.offerOnForm.isValid()) {
        this.errorOnForm = true;
        return;
      }
      this.offerViewService.editOffer(this.offerOnForm);
    }

    this.router.navigate(["/profile"]);
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

  getSelectedOptions(key: String, selected) {
    if (key === 'softskill') {
      this.offerOnForm.softSkills = selected;
    } else {
      this.offerOnForm.domains = selected;
    }
  }

  openOrCloseModalSave() {
    this.modalSave = !this.modalSave;
  }
}
