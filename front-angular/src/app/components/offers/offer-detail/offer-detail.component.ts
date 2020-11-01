import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { Offer, Company } from '../../../../models';
import { OfferViewService, CompanyService } from '../../../services';

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
            this.colorScore = this.sanitizer.bypassSecurityTrustStyle('color:' + this.offerViewService.defineColor(this.offer.matchingScore));
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

}
