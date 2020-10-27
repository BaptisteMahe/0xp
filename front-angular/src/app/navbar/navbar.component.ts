import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { GlobalService, UserService} from '../services';
import { User } from 'src/models';
import { NotificationsService } from '../profile/notification/notifications.service';

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

  constructor(private globalService: GlobalService,
              private userService: UserService,
              private notificationsService: NotificationsService) {
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
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
