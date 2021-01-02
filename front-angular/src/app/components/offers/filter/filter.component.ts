import { Subscription } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { NotificationsService, SelectService } from '../../../services';
import { Filter, OfferType, OfferDuration, SelectOption } from '../../../../models';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
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

  currentFilter: Filter;
  @Output() filterEvent = new EventEmitter<Filter>();

  typeList = Object.values(OfferType);
  timeList = Object.values(OfferDuration);
  sectorList: SelectOption[];

  // Pour le filtre avancé
  salaireMax: number;

  isMoreFilterOpen = false;

  offerLocationList: SelectOption[] = [];
  offerCompanyList: SelectOption[] = [];

  dateFromDate: Date = new Date();
  dateStart = new FormControl(moment());

  isNotifAdded: boolean;
  isNotifAddedSubscription: Subscription;
  isStudent: boolean;

  constructor(private notificationsService: NotificationsService,
              private selectService: SelectService) { }

  ngOnInit() {
    this.isStudent = this.notificationsService.currentUser.isStudent;
    this.currentFilter = new Filter();
    this.dateFromDate.setDate(1);

    this.isNotifAddedSubscription = this.notificationsService.isNotifAddedSubject.subscribe(
      (isNotifAdded: boolean) => {
        this.isNotifAdded = isNotifAdded;
        if (this.isNotifAdded) {
          this.notificationsService.majFilterForNotif(this.currentFilter);
        }
      }
    );

    this.getSelectOptions();
  }

  onFilterClick() {
    this.filterEvent.emit(this.currentFilter);

    this.isNotifAdded = false; // TODO : Should check if notif already exists
    this.notificationsService.switchIsNotifAdded(this.isNotifAdded);
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

  addNotif() {
    this.isNotifAdded = true;
    this.notificationsService.switchIsNotifAdded(this.isNotifAdded);
    this.notificationsService.majFilterForNotif(this.currentFilter);
  }

  getSelectOptions() {
    this.selectService.getSectors().subscribe(sectors => {
      this.sectorList = sectors;
    });
    this.selectService.getCompaniesForSelectNoImg().subscribe(companies => {
      this.offerCompanyList = companies;
    });
    this.selectService.getLocations().subscribe(locations => {
      this.offerLocationList = locations;
    });
  }
}
