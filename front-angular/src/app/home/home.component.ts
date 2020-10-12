import { Component, OnInit } from '@angular/core';
import { User } from 'src/models';
import { AuthenticationService } from '../logging/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe((user: User) => this.currentUser = user);
  }

}
