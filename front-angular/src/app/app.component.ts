import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { LoggerService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ZeroXp';

  toggleSidenavSubject = new Subject<void>();

  constructor(private loggerService: LoggerService) { }

  ngOnInit() {
  }

  onToggle() {
    this.toggleSidenavSubject.next();
  }

}
