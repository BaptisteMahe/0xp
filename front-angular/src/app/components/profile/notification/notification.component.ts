import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService, NotificationsService } from '../../../services';
import { NotificationObj, User } from '../../../../models';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  listNotif: any[] = [];
  currentUser: any;
  currentUserCopy: any; // Backup for logout

  constructor(private userService: UserService,
              private notificationService: NotificationsService) {
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.currentUserCopy = this.currentUser;
    if (this.currentUser.notifications){
      this.computeNotif(this.currentUser.notifications);
    }
  }

  ngOnDestroy(){
    // On emet la lecture des notifications pour l'user
    this.notificationService.clearNotifications(this.currentUserCopy);
  }

  computeNotif(notifications) {
    this.listNotif = [];
    notifications.sort((notifA: NotificationObj, notifB: NotificationObj) => +notifB.ts - +notifA.ts);
    notifications.forEach((notif: NotificationObj) => {
      this.listNotif.push({ type: notif.type, tsStr: this.tsToDateCustom(notif.ts), isRead: notif.isRead });
    });
  }

  tsToDateCustom(ts) {
    const listMois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    if (new Date().getTime() - ts < 1000 * 60 * 60 * 24) {
      return new Date(ts).getUTCHours() + 1 + ' : ' + (new Date(ts).getUTCMinutes() < 10 ?
          '0' + new Date(ts).getUTCMinutes() : new Date(ts).getUTCMinutes());

    } else if (new Date().getTime() - ts < 1000 * 60 * 60 * 24 * 30) {
      return new Date(ts).getUTCDate() + ' ' + listMois[new Date(ts).getUTCMonth()];
    } else {
      return 'Il y a ' + Math.floor((new Date().getTime() - ts) / 1000 * 60 * 60 * 24 * 30) + ' mois';
    }
  }

}
