import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

import { Offer, Company, Document, Filter } from '../../../../models';
import { OfferService, CompanyService, DocumentService, FilterService } from '../../../services';
import { PdfPreviewComponent } from '../../entreprises/add-pdf/add-pdf.component';

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

  currentFilter: Filter;
  filterKeys: string[];

  constructor(private router: Router,
              private offerViewService: OfferService,
              private sanitizer: DomSanitizer,
              private companyService: CompanyService,
              private documentService: DocumentService,
              private filterService: FilterService,
              private matDialog: MatDialog) { }

  ngOnInit() {
    const idOffer = this.router.url.replace('/offers/', '');
    this.currentFilter = this.filterService.getCurrentFilter();
    this.filterKeys = Object.keys(this.currentFilter);

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

  onPdfPreviewClick() {
    this.matDialog.open(PdfPreviewComponent, {
      data: this.offerPdf
    });
  }
}
