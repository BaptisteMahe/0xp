import { Company } from 'src/models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './detail-company.component.html',
  styleUrls: ['./detail-company.component.scss']
})
export class DetailCompanyComponent implements OnInit {

  companyId: string;
  company: Company;
  constructor(private route: ActivatedRoute,
    public companyService: CompanyService) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.params.id;
    this.companyService.getById(this.companyId).subscribe(
      value => {
        this.company = value;
      },
      error => {
        console.log('Erreur ! : ' + error);
      }
    );

  }

}
