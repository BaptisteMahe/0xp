import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router , NavigationEnd  } from '@angular/router';

import { UserService} from '../../services';
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

  nbrNotif: number;
  nbrNotifSubscription: Subscription;

  constructor(private router: Router,
              private userService: UserService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });

    this.nbrNotif = this.notificationsService.nbrNotif;
    this.nbrNotifSubscription = this.notificationsService.nbrNotifSubject.subscribe(
      (nbrNotif: number) => {
        this.nbrNotif = nbrNotif;
      }
    );

    this.router.events.subscribe(event => {
      if ( event instanceof NavigationEnd) {
        this.isProfilOpen = event.url === '/profile';
      }
    });
  }

}
