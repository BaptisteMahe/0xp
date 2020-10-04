import { NotificationsService } from './../profile/notification/notifications.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models';
import { AuthenticationService } from '../logging/services';
import { GlobalService } from '../services/global.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  isProfilOpen: boolean;
  isProfilOpenSubscription: Subscription;
  nbrNotif: number;
  nbrNotifSubscription: Subscription;
  constructor(private authenticationService: AuthenticationService,
    private globalService: GlobalService,
    private notificationsService: NotificationsService) {
    this.authenticationService.currentUser.subscribe(
      (currentUser: User) => {
        this.currentUser = currentUser;
      });
  }

  ngOnInit() {
    this.nbrNotif = this.notificationsService.nbrNotif;
    this.isProfilOpen = this.globalService.isProfilOpen;
    this.isProfilOpenSubscription = this.globalService.isProfilOpenSubject.subscribe(
      (isProfilOpen: boolean) => {
        this.isProfilOpen = isProfilOpen;
      }
    );
    this.nbrNotifSubscription = this.notificationsService.nbrNotifSubject.subscribe(
      (nbrNotif: number) => {
        this.nbrNotif = nbrNotif;
      }
    );
  }

}
