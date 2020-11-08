import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ZeroXp';

  constructor() { }

  @ViewChild(SidenavComponent)
  private sidenavComponent: SidenavComponent;

  ngOnInit() {
  }

  onToggle() {
    this.sidenavComponent.onToggle()
  }

}
