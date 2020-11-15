import { Component, OnInit } from '@angular/core';

import { Company } from 'src/models';
import { CompanyService } from '../../../services';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss']
})
export class ListCompanyComponent implements OnInit {

  companiesList: Company[];
  unfilteredCompaniesList: Company[];
  companyTextQuery: string;

  constructor(public companyService: CompanyService) { }

  ngOnInit() {
    this.loadAllCompanies();
    this.companyService.newCompanyEvent.subscribe(() => {
      this.loadAllCompanies();
    });
  }

  resetQuery() {
    this.companyTextQuery = '';
    this.filter();
  }

  filter() {
    this.companiesList = this.unfilteredCompaniesList;
    this.companiesList = this.unfilteredCompaniesList.filter((company: Company) => {
      return company.name.toLowerCase().indexOf(this.companyTextQuery.toLowerCase()) !== -1;
    });
  }

  loadAllCompanies() {
    this.companyService.getAll().subscribe(
        value => {
          this.companiesList = value;
          this.unfilteredCompaniesList = value;
        },
        error => {
          console.log('Erreur ! : ' + error);
        }
    );
  }
}
