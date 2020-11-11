import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ZeroXp';

  toggleSubject = new Subject<void>();

  constructor() { }

  ngOnInit() {
  }

  onToggle() {
    this.toggleSubject.next();
  }

}
