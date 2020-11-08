import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

/**
 * @title Autosize sidenav
 */
@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
})
export class SidenavComponent implements OnInit{

  @ViewChild('drawer') drawer: MatDrawer;

  constructor(){
  }

  ngOnInit(){
  }

  onToggle() {
    this.drawer.toggle();
  }

}