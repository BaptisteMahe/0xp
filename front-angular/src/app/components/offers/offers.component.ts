import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Offer, Filter } from '../../../models';
import { OfferViewService, SortCategory, NotificationsService } from '../../services';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  offerList: Offer[];
  isLoading = true;

  isStudent: boolean;

  sortStatus: typeof SortCategory = SortCategory;
  sortedBy: SortCategory = SortCategory.matchingScore;

  isNotifAdded: boolean;
  isNotifAddedSubscription: Subscription;

  constructor(private offerViewService: OfferViewService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.isStudent = this.notificationsService.currentUser.isStudent;

    this.offerViewService.getAllOffers().subscribe(offerList => {
      this.offerList = offerList;
      this.isLoading = false;
    });

    this.isNotifAddedSubscription = this.notificationsService.isNotifAddedSubject.subscribe(
      (isNotifAdded: boolean) => {
        this.isNotifAdded = isNotifAdded;
      }
    );
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

  addAlert() {
    this.isNotifAdded = true;
    this.notificationsService.switchIsNotifAdded(this.isNotifAdded);
  }
}
