import { Component, OnInit } from '@angular/core';

import { Offer, Filter, User } from '../../../models';
import { OfferService, SortCategory, UserService, FilterService } from '../../services';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  currentUser: User;

  offerList: Offer[];
  isLoading = true;

  sortStatus: typeof SortCategory = SortCategory;
  sortedBy: SortCategory = SortCategory.matchingScore;

  constructor(private userService: UserService,
              private filterService: FilterService,
              private offerViewService: OfferService) { }

  ngOnInit() {

    const currentFilter = this.filterService.getCurrentFilter();
    if (currentFilter) {
      this.onFilterEvent(currentFilter);
    } else {
      this.offerViewService.getAllOffers().subscribe(offerList => {
        this.offerList = offerList;
        this.isLoading = false;
      });
    }

    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });

    this.filterService.getFilterObs().subscribe((newFilter: Filter) => {
      this.onFilterEvent(newFilter);
    });
  }

  onFilterEvent(filter: Filter) {
    this.isLoading = true;
    this.offerViewService.getFilteredOffers(filter).subscribe((filteredListOffer: Offer[]) => {
      this.offerList = filteredListOffer;
      this.isLoading = false;
    });
  }

  changeSortBy(sortKey: SortCategory) {
    if (sortKey !== this.sortedBy) {
      this.offerViewService.sortArray(this.offerList, sortKey);
      this.sortedBy = sortKey;
    }
  }
}
