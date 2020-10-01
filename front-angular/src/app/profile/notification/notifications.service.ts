import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Filter } from 'src/models/Filter';
import { AuthenticationService } from 'src/app/logging/services';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class NotificationsService {
  apiUrl = environment.apiUrl;

  currentUser: any;

  nbrNotif: number;
  nbrNotifSubject = new Subject<number>();

  isNotifAdded: Boolean = false;
  isNotifAddedSubject = new Subject<Boolean>();

  currentFilterInOffer: Filter = new Filter();

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.searchForNotifications();
    });
  }

  searchForNotifications() {
    console.log("%c Searching for notification", "color:orange")
    this.nbrNotif = 0;
    if (this.currentUser && this.currentUser.notifications) {
      this.currentUser.notifications.forEach((notif) => {
        if (!notif.isRead) {
          this.nbrNotif += 1;
        }
      });
      this.emitNbrNotifSubject();
    }
  }

  emitNbrNotifSubject() {
    this.nbrNotifSubject.next(this.nbrNotif);
  }

  emitIsNotifAddedSubject() {
    this.isNotifAddedSubject.next(this.isNotifAdded);
  }


  switchIsNotifAdded(isNotifAdded: Boolean) {
    this.isNotifAdded = isNotifAdded;
    this.emitIsNotifAddedSubject();
  }

  majFilterForNotif(currentFilter: Filter) {
    this.currentFilterInOffer = currentFilter;
    this.addNotif();
  }

  addNotif() {
    console.log(this.currentFilterInOffer);
    this.httpClient.post<Filter>(this.apiUrl + '/users/addAlert', { filter: this.currentFilterInOffer, user: this.currentUser }).subscribe(
      (response) => {
        console.log('Alerte ajoutée');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  clearNotifications(user) {
    this.nbrNotif = 0;
    this.emitNbrNotifSubject();
    // On met toutes les notifications en lues
    console.log(user)
    if (user.notifications) {
      user.notifications.forEach((notif) => {
        notif.isRead = true;
      });
      this.httpClient.post<any>(this.apiUrl + '/users/clearNotifications', { user }).subscribe(
        (response) => {
          console.log('Notifications marquées comme lues');
          this.authenticationService.saveUser(user);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    }
  }
}
