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
  constructor(public companyService: CompanyService) { }

  ngOnInit() {

    // TODO spinner
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

  filter(input) {
    this.companiesList = this.unfilteredCompaniesList;
    const requete = input.target.value;
    const list = this.unfilteredCompaniesList.filter((el) => {
      return el.name.toLowerCase().indexOf(requete.toLowerCase()) !== -1;
    });
    this.companiesList = list;
  }

}
