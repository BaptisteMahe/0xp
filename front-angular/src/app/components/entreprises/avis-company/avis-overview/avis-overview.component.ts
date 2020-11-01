import { Component, OnInit, Input } from '@angular/core';
import { Avis } from 'src/models';

@Component({
  selector: 'app-avis-overview',
  templateUrl: './avis-overview.component.html',
  styleUrls: ['./avis-overview.component.scss']
})
export class AvisOverviewComponent implements OnInit {

  @Input() avis: Avis;
  noteGlobal: number;

  constructor() { }

  ngOnInit() {
    this.noteGlobal = parseInt(this.avis.noteGenerale, 10)
      + parseInt(this.avis.noteInteret, 10)
      + parseInt(this.avis.noteAmbiance, 10)
      + parseInt(this.avis.noteEncadrt, 10);
  }

}