import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { OfferViewService } from '../offerView.service';

import { Filter } from 'src/models/Filter';


import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
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

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class FilterComponent implements OnInit {
  currentFilter: Filter = new Filter();

  typeList: string[] = ['Stage', 'Alternance', 'Emploi'];
  timeList: string[] = ['1-2 mois', '6 mois', '2 ans'];
  sectorList: string[] = ['Audit / Conseil', 'Informatique', 'Mécanique'];

  //Pour le filtre avancé
  isMoreFilterOpen = false;
  listArticlesSubscription: Subscription;

  listOfferLocation: any[] = [];
  locationForm = new FormGroup({
    selected: new FormControl()
  });

  listOfferCompany: any[] = [];
  companyForm = new FormGroup({
    selected: new FormControl()
  });
  dateFromDate : Date = new Date();
  dateStart = new FormControl(moment());

  constructor(private offerViewService: OfferViewService) { }

  ngOnInit() {
    this.currentFilter.textInput = '';
    this.currentFilter.type = 'All';
    this.currentFilter.duration = 'All';
    this.currentFilter.sector = 'All';
    this.currentFilter.company = []
    this.currentFilter.location = [];
    this.currentFilter.companySize = 'All';
    this.currentFilter.publicationDate = 'All';
    this.currentFilter.isPartner = false;
    this.currentFilter.matchingMini = 0;
    this.currentFilter.remunMini = 0;
    this.dateFromDate.setDate(1);
  }

  filter() {

    console.log(this.companyForm)
    if (this.currentFilter.type === 'All') {
      this.currentFilter.type = '';
    }
    if (this.currentFilter.duration === 'All') {
      this.currentFilter.duration = ''; 
    }
    if (this.currentFilter.sector === 'All') {
      this.currentFilter.sector = '';
    }
    if (this.currentFilter.companySize === 'All') {
      this.currentFilter.companySize = '';
    }
    if (this.currentFilter.publicationDate === 'All') {
      this.currentFilter.publicationDate = '';
    }

    this.currentFilter.start_date = this.dateFromDate.getTime()

    this.offerViewService.filter(this.currentFilter);
    this.isMoreFilterOpen = false;
  }
  manageMoreFilter() {
    this.isMoreFilterOpen = !this.isMoreFilterOpen;

    if (this.listOfferLocation.length == 0) {
      //On récupère le nom des villes pour lesquelles on a des stages
      this.listArticlesSubscription = this.offerViewService.listOffersSubject.subscribe(
        (listOffers: any[]) => {
          let setVille = new Set([]);
          listOffers.forEach((offer) => {
            if (!setVille.has(offer['location'])){
              setVille.add(offer['location']);

              this.listOfferLocation.push(
                {
                  display: offer['location'],
                  value: offer['location']
                }
                );
            }
          })
        }
      );
      this.offerViewService.emitListOffersSubject();
    }

    if (this.listOfferCompany.length == 0) {
      //On récupère le nom des villes pour lesquelles on a des stages
      this.listArticlesSubscription = this.offerViewService.listOffersSubject.subscribe(
        (listOffers: any[]) => {
          listOffers.forEach((offer) => {
            this.listOfferCompany.push(
              {
                display: offer['company'],
                value: offer['company']
              }
              );
          })
        }
      );
      this.offerViewService.emitListOffersSubject();
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

  getSelectedOptions(key:String, selected) {
    if (key==='company'){
      this.currentFilter.company = selected;
    } else {
      this.currentFilter.location = selected;
    }
  }
}
