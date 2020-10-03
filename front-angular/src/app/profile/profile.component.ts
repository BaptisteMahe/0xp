import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../logging/services';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { User } from '../../models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  currentUser: User;
  showProfile: boolean;
  showCandidatures: boolean;
  showNotifs: boolean;

  constructor(private authenticationService: AuthenticationService, private globalService: GlobalService,
    private router: Router) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  clicSection = (e, section) => {
    const buttons = document.getElementsByClassName('bar-button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('current');
    }
    e.target.classList.add('current');
    if (section === 'profil') {
      this.showProfile = true;
      this.showCandidatures = false;
      this.showNotifs = false;
    } else if (section === 'notif') {
      this.showProfile = false;
      this.showCandidatures = false;
      this.showNotifs = true;
    } else {
      this.showProfile = false;
      this.showCandidatures = true;
      this.showNotifs = false;
    }
  }


  ngOnInit() {
    this.showProfile = true;
    this.showCandidatures = false;
    this.showNotifs = false;
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
