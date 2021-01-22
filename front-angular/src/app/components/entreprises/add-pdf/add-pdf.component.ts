import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-pdf',
  templateUrl: './add-pdf.component.html',
  styleUrls: ['./add-pdf.component.scss']
})
export class AddPdfComponent implements OnInit {

  fileReader = new FileReader();

  @Input()
  pdfAsBase64: string;

  @Output()
  pdfReadyEvent = new EventEmitter<string>();

  constructor(private ng2ImgMaxService: Ng2ImgMaxService,
              private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.fileReader.onerror = (error) => {
      this.matSnackBar.open('An error occurred with your image', null, { duration: 3000, panelClass: ['snack-bar-error'] });
      console.log(error);
    };
  }

  onPdfChange(event) {
    const file = event.target.files[0];

    if (file) {
      this.fileReader.onload = () => {
        this.pdfAsBase64 = this.fileReader.result.toString();
        console.log(this.fileReader.result);
        // this.pdfReadyEvent.emit(this.fileReader.result.toString());
      };
      this.fileReader.readAsDataURL(file);
    }
  }

}
