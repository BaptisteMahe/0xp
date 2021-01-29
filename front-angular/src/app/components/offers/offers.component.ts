import { Component, OnInit } from '@angular/core';

import { Offer, Filter, User } from '../../../models';
import { OfferService, SortCategory, UserService } from '../../services';

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
              private offerViewService: OfferService) { }

  ngOnInit() {

    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });

    this.offerViewService.getAllOffers().subscribe(offerList => {
      this.offerList = offerList;
      this.isLoading = false;
    });
  }

  onFilterEvent(filter: Filter) {
    this.isLoading = true;
    this.offerViewService.getFilteredOffers(filter).subscribe(filteredListOffer => {
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
