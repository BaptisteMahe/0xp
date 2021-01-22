import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CompanyService } from '../../../services';
import { Company, CompanyCategories } from '../../../../models';

@Component({
  selector: 'app-company',
  templateUrl: './detail-company.component.html',
  styleUrls: ['./detail-company.component.scss']
})
export class DetailCompanyComponent implements OnInit {

  companyId: string;
  company: Company;
  currentCategoryDisplay: string;

  constructor(private route: ActivatedRoute,
              public companyService: CompanyService) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.params.id;
    this.companyService.getById(this.companyId).subscribe(
      value => {
        this.company = value;
        this.currentCategoryDisplay = CompanyCategories.find(category => category._id === this.company.category).display;
      },
      error => {
        console.log('Erreur ! : ' + error);
      }
    );

  }

}
