import { OfferViewService } from './../offerView.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Offer } from 'src/models/Offer';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {

  offer: Offer;

  public notNull(o) {
    if(typeof o === 'undefined'){
      return false;
    } else if (o === null){
      return false;
    } else {
      return true;
    }
  };

  constructor(private route: ActivatedRoute, private offerViewService : OfferViewService) { }

  ngOnInit() {
    let idOffer = this.route.snapshot.params['id'];
    this.offer = this.offerViewService.getOfferById(idOffer)
  }

}
