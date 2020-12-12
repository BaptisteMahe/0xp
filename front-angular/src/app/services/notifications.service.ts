import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Filter, User } from '../../models';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable()
export class NotificationsService {

  private apiUrl = environment.apiUrl;
  currentUser: User;

  nbrNotif: number;
  nbrNotifSubject = new Subject<number>();

  isNotifAdded = false;
  isNotifAddedSubject = new Subject<boolean>();

  currentFilterInOffer: Filter = new Filter();

  constructor(private httpClient: HttpClient,
              private userService: UserService) {
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  searchForNotifications() {
    this.nbrNotif = 0;
    this.currentUser?.notifications?.forEach((notif) => {
      if (!notif.isRead) {
        this.nbrNotif += 1;
      }
    });
    this.emitNbrNotifSubject();
  }

  emitNbrNotifSubject() {
    this.nbrNotifSubject.next(this.nbrNotif);
  }

  emitIsNotifAddedSubject() {
    this.isNotifAddedSubject.next(this.isNotifAdded);
  }


  switchIsNotifAdded(isNotifAdded: boolean) {
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

    if (user.notifications) {
      user.notifications.forEach((notif) => {
        notif.isRead = true;
      });
      this.httpClient.post<any>(this.apiUrl + '/users/clearNotifications', { user }).subscribe(
        (response) => {
          console.log('Notifications marquées comme lues');
          this.userService.update(user);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    }
  }
}
