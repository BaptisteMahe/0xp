import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Avis } from '../../../../../models';

@Component({
  selector: 'app-avis-overview',
  templateUrl: './avis-overview.component.html',
  styleUrls: ['./avis-overview.component.scss']
})
export class AvisOverviewComponent implements OnInit {

  @Input()
  avis: Avis;

  @Input()
  isAdmin: boolean;

  @Output()
  deleteEvent = new EventEmitter<string>();

  noteGlobal: number;

  constructor() { }

  ngOnInit() {
    this.noteGlobal = this.avis.noteGenerale + this.avis.noteAmbiance + this.avis.noteEncadrt + this.avis.noteInteret;
  }

  onDeleteClick() {
    this.deleteEvent.emit(this.avis._id);
  }
}
