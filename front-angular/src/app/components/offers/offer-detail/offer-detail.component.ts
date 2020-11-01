import { Subscription } from 'rxjs';
import { OfferViewService } from '../offerView.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Offer } from 'src/models/Offer';
import { CompanyService } from '../../../services/company.service';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { Company } from 'src/models/Company';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {

  offer: Offer = new Offer();
  colorScore: SafeStyle;
  company: Company;
  offerSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private offerViewService: OfferViewService,
    private sanitizer: DomSanitizer,
    private companyService: CompanyService) { }

  isModalopen = false;

  public notNull(o) {
    if (typeof o === 'undefined') {
      return false;
    } else if (o === null) {
      return false;
    } else {
      return true;
    }
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.offerViewService.fillListOffers();
    const idOffer = this.route.snapshot.params.id;

    this.offerSubscription = this.offerViewService.listOffersSubject.subscribe(
      (listOffers: Offer[]) => {
        listOffers.forEach((offer) => {
          if (offer.id === idOffer) {
            this.offer = offer;
            this.colorScore = this.sanitizer.bypassSecurityTrustStyle('color:' + this.defineColor(this.offer.matchingScore));
          }
        });
        this.companyService.getById(this.offer.id_company).subscribe(
          company => {
            this.company = company;
          },
          error => {
            console.log('Erreur ! : ' + error);
          }
        );
      }
    );

    this.offerViewService.emitListOffersSubject();
  }

  openOrClose() {
    this.isModalopen = !this.isModalopen;
  }

  defineColor(percentage: Number) {
    percentage = +percentage / 100;
    const percentColors = [
      { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
      { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
      { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } }];

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

}
