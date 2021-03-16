import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import { Filter } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filterSub = new BehaviorSubject<Filter>({ } as Filter);
  currentFilter: Filter = { } as Filter;

  constructor() { }

  getFilterObs(): Observable<Filter> {
    return this.filterSub.asObservable();
  }

  setCurrentFilter(filter: Filter) {
    this.currentFilter = filter;
    this.filterSub.next(this.currentFilter);
  }

  getCurrentFilter(): Filter {
    return this.currentFilter;
  }
}
