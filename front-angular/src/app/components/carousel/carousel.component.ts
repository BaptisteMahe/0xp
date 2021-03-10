import { Component, AfterContentInit} from '@angular/core';

import { Company } from '../../../models';
import { CompanyService } from '../../services';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterContentInit{

  partnerCompaniesList: Company[];
  nPartnerCompanies: number;
  indexes: number[];
  nRep: number;
  containerWidth: number;
  imageWidth: number = 140;

  constructor(public companyService: CompanyService) {}

  ngAfterContentInit(): void {
    this.containerWidth = document.querySelector('.carousel-container').clientWidth;
    this.loadPartnerCompanies();
  }
  
  loadPartnerCompanies() {
    this.companyService.getAll().subscribe(
      companies => {
        this.partnerCompaniesList = companies;
        this.nPartnerCompanies = this.partnerCompaniesList.length;
        this.initIndexes();
        this.initAnimation();
      },
      error => {
        console.log('Erreur ! : ' + error);
      }
    )
  }

  initIndexes() {
    this.nRep = Math.floor(2 + this.containerWidth / (this.imageWidth * this.nPartnerCompanies))
    this.indexes = Array.from(Array(this.nRep * this.nPartnerCompanies).keys())
    this.indexes = this.indexes.map((i) => i % this.nPartnerCompanies)
  }

  initAnimation() {
    var style = document.documentElement.appendChild(document.createElement("style"))
    var keyframe = "@keyframes move {\
      from {left: -" + this.nPartnerCompanies * this.imageWidth + "px;}\
      to {left: 0%}";
    style.sheet.insertRule(keyframe, 0);
    style.sheet.insertRule(".moving {animation: " + 3 * this.nPartnerCompanies + "s move linear infinite}", 0);
  }
  
}
