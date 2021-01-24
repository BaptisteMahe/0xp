import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Document } from '../../../../models';
@Component({
  selector: 'app-add-pdf',
  templateUrl: './add-pdf.component.html',
  styleUrls: ['./add-pdf.component.scss']
})
export class AddPdfComponent implements OnInit {

  @Input()
  currentPdf: Document;

  @Output()
  pdfLoadingEvent = new EventEmitter<void>();

  @Output()
  pdfReadyEvent = new EventEmitter<Document>();

  fileReader = new FileReader();

  currentFile: File;

  constructor(private matDialog: MatDialog,
              private ng2ImgMaxService: Ng2ImgMaxService,
              private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.fileReader.onerror = (error) => {
      this.matSnackBar.open('Il y a eut une erreur avec votre pdf', null, { duration: 3000, panelClass: ['snack-bar-error'] });
      console.log(error);
    };
    if (!this.currentPdf) {
      this.currentPdf = { } as Document;
    }
  }

  onPdfChange(event) {
    this.pdfLoadingEvent.emit();
    this.currentFile = event.target.files[0];
    if (this.currentFile) {
      if (this.currentFile.type === 'application/pdf') {
        this.fileReader.onload = () => {
          this.currentPdf.base64Data = this.fileReader.result.toString();
          this.currentPdf.name = this.currentFile.name;
          this.pdfReadyEvent.emit(this.currentPdf);
        };
        this.fileReader.readAsDataURL(this.currentFile);
      } else {
        this.matSnackBar.open('Le document n\'est pas au format pdf', null, { duration: 3000, panelClass: ['snack-bar-error'] });
      }
    }
  }

  onDelete(pdfInput: HTMLInputElement) {
    pdfInput.value = '';
    this.currentPdf = {_id: 'delete'} as Document;
    this.pdfReadyEvent.emit(this.currentPdf);
  }

  onPreviewClick() {
    this.matDialog.open(PdfPreviewComponent, {
      data: this.currentPdf
    });
  }
}

@Component({
  selector: 'app-pdf-preview',
  template: `
      <div mat-dialog-title class="pdf-preview-title">
          <h4>{{currentPdf.name}}</h4>
          <button mat-icon-button mat-dialog-close>
              <mat-icon>close</mat-icon>
          </button>
      </div>
      <pdf-viewer
              mat-dialog-content
              class="pdf-preview"
              [show-borders]="true"
              [src]="currentPdf.base64Data">
      </pdf-viewer>
  `,
  styles: [
      `.pdf-preview-title {
          display: flex;
          justify-content: space-between;
      }`
  ]
})
export class PdfPreviewComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public currentPdf: Document) { }

}
