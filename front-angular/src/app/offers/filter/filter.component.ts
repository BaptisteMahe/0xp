import { NotificationsService } from './../../profile/notification/notifications.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { OfferViewService } from '../offerView.service';

import { Filter } from 'src/models/Filter';
import { Offer } from 'src/models/Offer';


import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { MatDatepicker } from '@angular/material';
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
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FilterComponent implements OnInit {
  currentFilter: Filter = new Filter();

  typeList: string[] = ['Stage', 'Alternance', 'Premier emploi'];
  timeList: string[] = ['1-2 mois', '6 mois', '2 ans'];
  sectorList: string[] = ['Audit / Conseil', 'Informatique', 'Mécanique'];

  // Pour le filtre avancé
  salaireMax: Number;

  isMoreFilterOpen = false;
  listOffersSubscription: Subscription;

  listOfferLocation: any[] = [];
  locationForm = new FormGroup({
    selected: new FormControl()
  });

  listOfferCompany: any[] = [];
  companyForm = new FormGroup({
    selected: new FormControl()
  });
  dateFromDate: Date = new Date();
  dateStart = new FormControl(moment());

  isNotifAdded: Boolean;
  isNotifAddedSubscription: Subscription;
  isStudent: Boolean;

  constructor(private offerViewService: OfferViewService, private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.isStudent = this.notificationsService.currentUser.isStudent;
    this.currentFilter.textInput = '';
    this.currentFilter.type = '';
    this.currentFilter.duration = '';
    this.currentFilter.sector = '';
    this.currentFilter.company = [];
    this.currentFilter.location = [];
    this.currentFilter.companySize = '';
    this.currentFilter.publicationDate = '';
    this.currentFilter.isPartner = false;
    this.currentFilter.matchingMini = 0;
    this.currentFilter.remunMini = 0;
    this.dateFromDate.setDate(1);

    this.isNotifAddedSubscription = this.notificationsService.isNotifAddedSubject.subscribe(
      (isNotifAdded: Boolean) => {
        this.isNotifAdded = isNotifAdded;
        if (this.isNotifAdded) {
          this.notificationsService.majFilterForNotif(this.currentFilter);
        }
      }
    );
  }

  filter() {
    console.log(this.currentFilter);
    this.currentFilter.start_date = this.dateFromDate.getTime();

    this.offerViewService.filter(this.currentFilter);
    this.isMoreFilterOpen = false;

    this.isNotifAdded = false;
    this.notificationsService.switchIsNotifAdded(this.isNotifAdded);
  }
  manageMoreFilter() {
    this.isMoreFilterOpen = !this.isMoreFilterOpen;
    const setVille = new Set([]);
    const setCompany = new Set([]);

    if (this.listOfferLocation.length === 0) {
      // On récupère le nom des villes pour lesquelles on a des stages
      this.listOffersSubscription = this.offerViewService.listOffersSubject.subscribe(
        (listOffers: Offer[]) => {
          listOffers.forEach((offer) => {
            if (!setVille.has(offer.location)) {
              setVille.add(offer.location);

              this.listOfferLocation.push(
                {
                  display: offer.location,
                  value: offer.location
                }
              );
            }
          });
        }
      );
    }

    if (this.listOfferCompany.length === 0) {
      // On récupère le nom des villes pour lesquelles on a des stages
      this.listOffersSubscription = this.offerViewService.listOffersSubject.subscribe(
        (listOffers: Offer[]) => {
          listOffers.forEach((offer) => {
            if (!setCompany.has(offer.company)) {
              setCompany.add(offer.company);
              this.listOfferCompany.push(
                {
                  display: offer.company,
                  value: offer.company
                }
              );
            }
          });
        }
      );
    }

    if (!this.salaireMax) {
      // On cherche la rémunération maximum
      this.listOffersSubscription = this.offerViewService.listOffersSubject.subscribe(
        (listOffers: Offer[]) => {
          this.salaireMax = listOffers[0].remuneration;
          listOffers.forEach((offer) => {
            this.salaireMax = Math.max(+this.salaireMax, +offer.remuneration);
          });
        }
      );
    }
    this.offerViewService.emitListOffersSubject();
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
    if (key === 'company') {
      this.currentFilter.company = selected;
    } else {
      this.currentFilter.location = selected;
    }
  }

  addNotif() {
    this.isNotifAdded = true;
    this.notificationsService.switchIsNotifAdded(this.isNotifAdded);
    this.notificationsService.majFilterForNotif(this.currentFilter);
  }
}
