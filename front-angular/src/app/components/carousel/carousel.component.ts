import { Component, OnInit } from '@angular/core';

import { Company } from '../../../models';
import { CompanyService } from '../../services';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  partnerCompaniesList: Company[];

  constructor(public companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadPartnerCompanies();
  }
  
  loadPartnerCompanies() {
    this.companyService.getAll().subscribe(
        companies => {
          this.partnerCompaniesList = [...companies.slice(0, 5), ...companies.slice(0, 5), ...companies.slice(0, 5)];
          this.partnerCompaniesList.filter((company) => {company.srcImage})
        },
        error => {
          console.log('Erreur ! : ' + error);
        }
    );
  }

}
