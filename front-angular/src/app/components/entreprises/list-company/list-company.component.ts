import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { Company } from '../../../../models';
import { CompanyService, OfferViewService } from '../../../services';
import { AddCompanyComponent } from '../add-company/add-company.component';



@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss']
})
export class ListCompanyComponent implements OnInit {

  @Input() modifyEnabled = false;

  companiesList: Company[];
  unfilteredCompaniesList: Company[];

  companyTextQuery: string;

  constructor(public companyService: CompanyService,
              public offerViewService: OfferViewService,
              public matDialog: MatDialog,
              private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadAllCompanies();
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

  onAddCompanyClick() {
    const dialogRef = this.matDialog.open(AddCompanyComponent);

    dialogRef.afterClosed().subscribe(
        result => {
          this.handleModifyResult(result, 'Registration');
        }
    );
  }

  onEditCompanyClick(event, company) {
    event.stopPropagation();

    const dialogRef = this.matDialog.open(AddCompanyComponent, {
      data: company
    });

    dialogRef.afterClosed().subscribe(
        result => {
          this.handleModifyResult(result, 'Modification');
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
          result => {
            if (result) {
              this.companyService.deleteById(company._id).subscribe(() => {
                this.loadAllCompanies();
              });
            }
          });
    });
  }

  handleModifyResult(result: Observable<any>, type: string) {
    if (result) {
      result.subscribe(
          data => {
            this.matSnackBar.open(type + ' successful', null, {
              duration: 3000,
              panelClass: ['snack-bar-success']
            });
            this.loadAllCompanies();
          },
          error => {
            this.matSnackBar.open(error, null, {duration: 3000, panelClass: ['snack-bar-error']});
          });
    }
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
