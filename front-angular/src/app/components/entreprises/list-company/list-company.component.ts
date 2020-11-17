import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Company } from 'src/models';
import { CompanyService } from '../../../services';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss']
})
export class ListCompanyComponent implements OnInit {

  @Input() deleteEnabled = false;

  companiesList: Company[];
  unfilteredCompaniesList: Company[];

  companyTextQuery: string;

  constructor(public companyService: CompanyService,
              public matDialog: MatDialog) { }

  ngOnInit() {
    this.loadAllCompanies();
    this.companyService.updateCompaniesEvent.subscribe(() => {
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

  onRemoveClick(event, company) {
    event.stopPropagation();
    const dialogRef = this.matDialog.open(DeleteCompanyComponent);

    dialogRef.afterClosed().subscribe(
        (result) => {
          if (result) {
            this.companyService.deleteById(company._id).subscribe(() => {
              this.companyService.updateCompaniesEvent.next();
            });
          }
        });
  }
}

@Component({
  selector: 'app-delete-company-dialog',
  template: `
  <h3 mat-dialog-title>Voulez-vous vraiment supprimer cette entreprise ?</h3>
  <div mat-dialog-actions align="end">
    <button mat-button [mat-dialog-close]="true">Supprimer</button>
    <button mat-button mat-dialog-close>Retour</button>
  </div>
  `,
})
export class DeleteCompanyComponent {

  constructor() { }
}
