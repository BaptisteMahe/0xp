import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Offer, User } from '../../../../../models';
import { DocumentService, OfferService, UserService } from '../../../../services';
import { QuitEditionDialogContentComponent } from './add-offer/add-offer.component';

@Component({
  selector: 'app-offer-company',
  templateUrl: './offer-company.component.html',
  styleUrls: ['./offer-company.component.scss']
})
export class OfferCompanyComponent implements OnInit {

  @Input()
  validationPanel = false;

  csvDownloadLink: string;

  listOffer: Offer[] = [];
  isEditingOffer = false;
  offerToBeEdited: Offer;
  currentUser: User;

  constructor(private offerService: OfferService,
              private userService: UserService,
              private documentService: DocumentService,
              private matDialog: MatDialog,
              private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.userService.getCurrentUserObs().subscribe(currentUser => {
      this.currentUser = currentUser;
      this.getOfferList();
    });
    this.csvDownloadLink = this.offerService.getCsvDownloadLink();
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
    this.offerService.deleteOffer(offerToBeDeleted._id).subscribe(
      (response) => {
        if (offerToBeDeleted.pdfId) {
          this.documentService.deleteById(offerToBeDeleted.pdfId).subscribe(
              () => {
                this.getOfferList();
              }, (error) => {
                this.matSnackBar.open('Erreur lors de la suppression du PDF de l\'offre' + error,
                    null, { duration: 3000, panelClass: ['snack-bar-error'] });
              });
        } else {
          this.getOfferList();
        }
      }, (error) => {
        this.matSnackBar.open('Erreur lors de la suppression de l\'offre' + error,
            null, { duration: 3000, panelClass: ['snack-bar-error'] });
      }
    );
  }

  onValidateClick(offerToBeValidated: Offer) {
    this.offerService.validateOffer(offerToBeValidated._id).subscribe(() => {
      this.getOfferList();
    });
  }

  onEditClick(offerToBeEdited: Offer) {
    this.isEditingOffer = true;
    this.offerToBeEdited = offerToBeEdited;
  }

  onCloseEditionClick() {
    const dialogRef = this.matDialog.open(QuitEditionDialogContentComponent);

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.isEditingOffer = false;
          this.offerToBeEdited = {} as Offer;
          this.getOfferList();
        }
      });
  }

  getOfferList() {
    if (this.currentUser?.type === 'admin') {
      this.offerService.getAllOffers(!this.validationPanel).subscribe((listOffer: Offer[]) => {
        this.listOffer = listOffer;
      });
    } else if (this.currentUser?.type === 'company') {
      this.offerService.getAllOffersByCompanyId(this.currentUser.companyId).subscribe((listOffer: Offer[]) => {
        this.listOffer = listOffer;
      });
    }
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
