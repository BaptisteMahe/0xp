import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router , NavigationEnd  } from '@angular/router';

import { UserService} from '../../services';
import { User } from '../../../models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser: User;

  currentTab: string;

  @Output() toggleSidenavEvent = new EventEmitter<boolean>();

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentTab = event.url.split('/')[1];
      }
    });
  }

  toggleSidenav() {
    this.toggleSidenavEvent.emit(true);
  }

}
