import { Component, OnInit } from '@angular/core';
import { Company } from 'src/models';
import { CompanyService } from '../../services/company.service';

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

  filter() {
    this.companiesList = this.unfilteredCompaniesList;
    this.companiesList = this.unfilteredCompaniesList.filter((company) => {
      return company.name.toLowerCase().indexOf(this.companyTextQuery.toLowerCase()) !== -1;
    });
  }

}
