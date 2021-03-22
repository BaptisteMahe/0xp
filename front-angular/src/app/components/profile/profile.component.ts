import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService, AuthenticationService } from '../../services';
import { User } from '../../../models';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  state$: Observable<any>;

  currentUser: User;

  tabIndex: number;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });

    this.state$ = this.activatedRoute.paramMap
        .pipe(map(() => window.history.state));

    this.state$.subscribe(data => {
      if (data?.tab === 'offer') {
        this.tabIndex = 1;
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
