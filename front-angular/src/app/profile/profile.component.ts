import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UserService, GlobalService, AuthenticationService } from '../services';
import { User } from '../../models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

    currentUser: User;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private globalService: GlobalService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });
    this.globalService.switchIsProfilOpen(true);
  }

  ngOnDestroy() {
    this.globalService.switchIsProfilOpen(false);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
