import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { SelectService, UserService } from '../../../services';
import {
  Filter,
  OfferType,
  OfferDuration,
  SelectOption,
  User,
  StudentTypes,
  OfferResearchType, getKeyFromValue, OfferResearchToFilters
} from '../../../../models';

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

  currentUser: User;

  currentFilter: Filter;
  @Output() filterEvent = new EventEmitter<Filter>();

  typeList = Object.values(OfferType);
  timeList = Object.values(OfferDuration);
  studentTypes = StudentTypes;
  offerResearchTypes = Object.values(OfferResearchType);
  selectedChip: OfferResearchType;
  sectorList: SelectOption[];
  offerLocationList: SelectOption[] = [];

  isMoreFilterOpen = false;

  dateStart = new FormControl(moment());

  constructor(private userService: UserService,
              private selectService: SelectService) { }

  ngOnInit() {
    this.currentFilter = { } as Filter;

    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });

    this.getSelectOptions();
  }

  onFilterClick() {
    this.selectedChip = null;
    this.filterEvent.emit(this.currentFilter);
  }

  onChipClick(selectedChip: OfferResearchType) {
    this.selectedChip = selectedChip;
    this.currentFilter = {...this.currentFilter, ...OfferResearchToFilters[getKeyFromValue(this.selectedChip)]};
    this.filterEvent.emit(this.currentFilter);
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.dateStart.value;
    ctrlValue.year(normalizedYear.year());
    this.dateStart.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker) {
    const ctrlValue = this.dateStart.value;
    ctrlValue.month(normalizedMonth.month());
    this.dateStart.setValue(ctrlValue);
    datepicker.close();
  }

  getSelectOptions() {
    this.selectService.getSectors().subscribe(sectors => {
      this.sectorList = sectors;
    });
    this.selectService.getLocations().subscribe(locations => {
      this.offerLocationList = locations;
    });
  }
}
