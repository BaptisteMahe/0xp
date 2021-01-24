import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

import { Offer, Company, Document } from '../../../../models';
import { OfferService, CompanyService, DocumentService } from '../../../services';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {

  offer: Offer = {} as Offer;
  company: Company;

  colorScore: SafeStyle;

  offerPdf: Document;

  isModalopen = false;

  constructor(private router: Router,
              private offerViewService: OfferService,
              private sanitizer: DomSanitizer,
              private companyService: CompanyService,
              private documentService: DocumentService) { }

  ngOnInit() {
    const idOffer = this.router.url.replace('/offers/', '');

    this.offerViewService.getOfferById(idOffer).subscribe(offer => {
      if (offer) {
        this.offer = offer;
        this.colorScore = this.sanitizer.bypassSecurityTrustStyle('color:' + this.offerViewService.defineColor(this.offer.matchingScore));
        this.companyService.getById(this.offer.company._id).subscribe(
            company => {
              this.company = company;
            },
            error => {
              console.log('Erreur ! : ' + error);
            }
        );
        if (this.offer.pdfId) {
          this.documentService.getById(this.offer.pdfId).subscribe((pdf) => {
            this.offerPdf = pdf;
            // TODO: Find why is it needed. (and doesn't work properly)
            window.scroll(0, 0);
          });
        } else {
          window.scroll(0, 0);
        }
      } else {
        this.router.navigate(['/offers']);
      }
    });
  }

  openOrClose() {
    this.isModalopen = !this.isModalopen;
  }

}
