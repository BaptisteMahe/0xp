import {Component, OnInit, Input, Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Company } from 'src/models';
import { CompanyService, OfferViewService } from '../../../services';

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
              public offerViewService: OfferViewService,
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

    this.offerViewService.getAllOffersByCompanyId(company._id).subscribe( response => {
      const dialogRef = this.matDialog.open(DeleteCompanyComponent, {
        data: response.length > 0
      });
      dialogRef.afterClosed().subscribe(
          (result) => {
            if (result) {
              this.companyService.deleteById(company._id).subscribe(() => {
                this.companyService.updateCompaniesEvent.next();
              });
            }
          });
    });

  }
}

@Component({
  selector: 'app-delete-company-dialog',
  template: `
  <h3 *ngIf="!isAnyOffer" mat-dialog-title>Voulez-vous vraiment supprimer cette entreprise ?</h3>
  <h3 *ngIf="isAnyOffer" mat-dialog-title>Vous ne pouvez pas supprimer cette entreprise car elle possède encore des offres sur le site !</h3>
  <div mat-dialog-actions align="end">
    <button *ngIf="!isAnyOffer" mat-button [mat-dialog-close]="true">Supprimer</button>
    <button mat-button mat-dialog-close>Retour</button>
  </div>
  `,
})
export class DeleteCompanyComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public isAnyOffer: boolean) { }
}
