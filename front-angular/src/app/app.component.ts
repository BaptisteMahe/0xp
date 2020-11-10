import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ZeroXp';

  @ViewChild(SidenavComponent)
  private sidenavComponent: SidenavComponent;

  constructor() { }

  ngOnInit() {
  }

  onToggle() {
    this.sidenavComponent.onToggle();
  }

}
