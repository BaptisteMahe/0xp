import { Component, OnInit, Input } from '@angular/core';

import { Offer } from '../../../models/Offer';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-offer-preview',
  templateUrl: './offer-preview.component.html',
  styleUrls: ['./offer-preview.component.scss']
})
export class OfferPreviewComponent implements OnInit {
  @Input() offer: Offer;
  colorScore: SafeStyle;
  strDateCreated: string;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.defineStrDateCreated();
    this.offer.matchingScore = Math.floor(this.offer.matchingScore);
    this.colorScore = this.sanitizer.bypassSecurityTrustStyle('color:' + this.defineColor(this.offer.matchingScore));
  }

  // TODO : Remake that shit
  defineColor(percentage: number) {
    percentage = + percentage / 100;
    const percentColors = [
      { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
      { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
      { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } }
    ];

    for (var i = 1; i < percentColors.length - 1; i++) {
      if (percentage < percentColors[i].pct) {
        break;
      }
    }
    const lower = percentColors[i - 1];
    const upper = percentColors[i];
    const range = upper.pct - lower.pct;
    const rangePct = (+percentage - lower.pct) / range;
    const pctLower = 1 - rangePct;
    const pctUpper = rangePct;
    const color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
  }

  defineStrDateCreated() {
    this.strDateCreated = 'Aujourd\'hui';
    const deltaTs = (new Date()).getTime() - +this.offer.created_date;

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
