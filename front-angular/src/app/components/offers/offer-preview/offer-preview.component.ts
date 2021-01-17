import { Component, OnInit, Input } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

import { Offer } from '../../../../models';
import { OfferService } from '../../../services';


@Component({
  selector: 'app-offer-preview',
  templateUrl: './offer-preview.component.html',
  styleUrls: ['./offer-preview.component.scss']
})
export class OfferPreviewComponent implements OnInit {
  @Input() offer: Offer;
  colorScore: SafeStyle;
  strDateCreated: string;

  constructor(private sanitizer: DomSanitizer,
              private offerViewService: OfferService) { }

  ngOnInit() {
    this.defineStrDateCreated();
    this.offer.matchingScore = Math.floor(this.offer.matchingScore);
    this.colorScore = this.sanitizer.bypassSecurityTrustStyle('color:' + this.offerViewService.defineColor(this.offer.matchingScore));
  }

  // TODO : Bofbof
  defineStrDateCreated() {
    this.strDateCreated = 'Aujourd\'hui';
    const deltaTs = (new Date()).getTime() - +this.offer.createdDate;

    if (deltaTs > 1000 * 60 * 60 * 24 * 635) {
      this.strDateCreated = 'Il y a ' + Math.floor(deltaTs / (1000 * 60 * 60 * 24 * 365)) + ' ans';
    } else if (deltaTs > 1000 * 60 * 60 * 24 * 30) {
      this.strDateCreated = 'Il y a ' + Math.floor(deltaTs / (1000 * 60 * 60 * 24 * 30)) + ' mois';
    } else if (deltaTs > 1000 * 60 * 60 * 24 * 7) {
      this.strDateCreated = 'Ce mois ci';
    } else if (deltaTs > 1000 * 60 * 60 * 24) {
      this.strDateCreated = 'Cette semaine';
    }
  }
}
