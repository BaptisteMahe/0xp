import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { Offer } from '../../../../../models';
import { OfferViewService } from '../../../../services';
import { QuitEditionDialogContentComponent } from './add-offer/add-offer.component';

@Component({
  selector: 'app-offer-company',
  templateUrl: './offer-company.component.html',
  styleUrls: ['./offer-company.component.scss']
})
export class OfferCompanyComponent implements OnInit {

  listOfferCompany: Offer[] = [];
  listOffersSubscription: Subscription;
  isEditingOffer = false;
  offreToBeEdited: Offer;

  constructor(private offerViewService: OfferViewService,
              private matDialog: MatDialog,
              private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.listOffersSubscription = this.offerViewService.customListOffersSubject.subscribe(
      (listOffers: Offer[]) => {
        this.listOfferCompany = listOffers?.slice();
      }
    );

    this.offerViewService.getListOfferByCompanyId();
  }

  onDeleteClick(offerToBeDeleted: Offer) {
    const dialogRef = this.matDialog.open(DeleteDialogContentComponent, {
      data: offerToBeDeleted
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(offerToBeDeleted);
      }
    });
  }

  deleteItem(offerToBeDeleted: Offer) {
    const deleteOfferObs = this.offerViewService.deleteOffer(offerToBeDeleted.id);
    deleteOfferObs.subscribe(
      (response) => {
        this.listOfferCompany = this.listOfferCompany.filter(offer => offer !== offerToBeDeleted);
      }, (error) => {
        this.matSnackBar.open('Error deleting the offer', null, { duration: 3000, panelClass: ['snack-bar-error'] });
      }
    );
  }

  onEditClick(offerToBeEdited: Offer) {
    this.isEditingOffer = true;
    this.offreToBeEdited = offerToBeEdited;
  }

  onCloseEditionClick() {
    const dialogRef = this.matDialog.open(QuitEditionDialogContentComponent);

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.isEditingOffer = false;
          this.offreToBeEdited = new Offer();
        }
      });
  }
}

@Component({
  selector: 'app-delete-dialog-content',
  template: `
  <h3 mat-dialog-title>Êtes-vous sûr de vouloir supprimer cette offre ?</h3>
  <h4 mat-dialog-content>{{offer.title}}</h4>
  <div mat-dialog-actions align="end">
    <button mat-button [mat-dialog-close]="true">Confirmer</button>
    <button mat-button mat-dialog-close>Annuler</button>
  </div>
  `,
})
export class DeleteDialogContentComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public offer: Offer) { }
}
