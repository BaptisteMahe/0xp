import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
})
export class SidenavComponent implements OnInit{

  @Input()
  toggleSidenavObs: Observable<void>;

  @ViewChild('drawer')
  drawer: MatDrawer;

  constructor(){ }

  ngOnInit(){
    this.toggleSidenavObs.subscribe(() => {
      this.drawer.toggle();
    });
  }

}
