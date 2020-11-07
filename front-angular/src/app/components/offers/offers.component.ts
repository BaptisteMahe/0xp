import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Offer } from '../../../models';
import { OfferViewService, SortCategory } from '../../services';
import { NotificationsService } from '../profile/notification/notifications.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  filteredListOffers: Offer[] = [];
  filteredListOffersSubscription: Subscription;
  isLoading: boolean;
  isLoadingSubscription: Subscription;

  isStudent: boolean;

  sortStatus: typeof SortCategory = SortCategory;
  sortedBy: SortCategory;

  isNotifAdded: boolean;
  isNotifAddedSubscription: Subscription;

  constructor(private offerViewService: OfferViewService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.isStudent = this.notificationsService.currentUser.isStudent;
    this.sortedBy = SortCategory.matchingScore;
    this.offerViewService.fillListOffers();
    this.filteredListOffersSubscription = this.offerViewService.filteredListOffersSubject.subscribe(
      (listOffers: any[]) => {
        this.filteredListOffers = listOffers?.slice();
      }
    );
    this.offerViewService.emitListOffersSubject();
    this.isLoadingSubscription = this.offerViewService.isLoadingSubject.subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      }
    );
    this.isNotifAddedSubscription = this.notificationsService.isNotifAddedSubject.subscribe(
      (isNotifAdded: boolean) => {
        this.isNotifAdded = isNotifAdded;
      }
    );
  }

  changeSortBy(sortKey: SortCategory) {
    if (sortKey !== this.sortedBy) {
      this.offerViewService.sortArray(this.filteredListOffers, sortKey);
      this.sortedBy = sortKey;
    }
  }

  addAlert() {
    this.isNotifAdded = true;
    this.notificationsService.switchIsNotifAdded(this.isNotifAdded);
  }
}
