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

  constructor(private sanitizer: DomSanitizer,
              public offerService: OfferService) { }

  ngOnInit() {
    this.offer.matchingScore = Math.floor(this.offer.matchingScore);
    this.colorScore = this.sanitizer.bypassSecurityTrustStyle('color:' + this.offerService.defineColor(this.offer.matchingScore));
  }
}
