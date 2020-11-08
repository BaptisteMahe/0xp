import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

/**
 * @title Autosize sidenav
 */
@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
})
export class SidenavComponent implements OnInit{

  @ViewChild('drawer', { static: true }) drawer: ElementRef;

  constructor(){
  }

  ngOnInit(){
  }

  onToggle() {
    console.log("from sidenav");
    this.drawer.toggle();
  }

}