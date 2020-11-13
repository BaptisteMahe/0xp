import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';

import { UserService} from '../../services';
import { User } from 'src/models';

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
})
export class SidenavComponent implements OnInit{

  currentUser: User;

  @Input()
  toggleSidenavObs: Observable<void>;

  @ViewChild('drawer')
  drawer: MatDrawer;

  constructor(private userService: UserService){ }

  ngOnInit(){
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });

    this.toggleSidenavObs.subscribe(() => {
      this.drawer.toggle();
    });
  }

}
