import { Component, OnInit } from '@angular/core';
import { Offer } from '../../models/Offer';
import { OfferViewService } from './offerView.service';
import { Subscription } from 'rxjs';
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
  sortedBy: string;
  isSortingPopupOpen = false;

  isNotifAdded: boolean;
  isNotifAddedSubscription: Subscription;

  constructor(private offerViewService: OfferViewService, private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.isStudent = this.notificationsService.currentUser.isStudent;
    this.sortedBy = 'matchingScore';
    this.offerViewService.fillListOffers();
    this.filteredListOffersSubscription = this.offerViewService.filteredListOffersSubject.subscribe(
      (listOffers: any[]) => {
        this.filteredListOffers = listOffers.slice();
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

  openOrClosePopup() {
    this.isSortingPopupOpen = !this.isSortingPopupOpen;
  }

  changeSortBy(key: string) {
    if (key !== this.sortedBy) {
      this.offerViewService.sortArray(this.filteredListOffers, key);
      this.sortedBy = key;
      this.isSortingPopupOpen = false;
    }
  }
  addAlert() {
    this.isNotifAdded = true;
    this.notificationsService.switchIsNotifAdded(this.isNotifAdded);
  }
}
