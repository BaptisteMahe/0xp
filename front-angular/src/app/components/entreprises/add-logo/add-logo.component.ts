import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ImageSize } from '../../../../models';

@Component({
  selector: 'app-add-logo',
  templateUrl: './add-logo.component.html',
  styleUrls: ['./add-logo.component.scss']
})
export class AddLogoComponent implements OnInit {

  fileReader = new FileReader();

  @Input()
  logoAsBase64: string;

  @Output()
  logoReadyEvent = new EventEmitter<string>();

  constructor(private ng2ImgMaxService: Ng2ImgMaxService,
              private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.fileReader.onload = () => {
      this.logoAsBase64 = this.fileReader.result.toString();
      this.logoReadyEvent.emit(this.fileReader.result.toString());
    };
    this.fileReader.onerror = (error) => {
      this.matSnackBar.open('An error occurred with your image', null, { duration: 3000, panelClass: ['snack-bar-error'] });
      console.log(error);
    };
  }

  onImgChange(event) {
    if (event.target.files[0]) {
      this.ng2ImgMaxService.resizeImage(event.target.files[0], ImageSize.MaxWidth, ImageSize.MaxHeight).subscribe(
          result => {
            this.fileReader.readAsDataURL(result);
          }, error => {
            this.matSnackBar.open(error.reason, null, { duration: 3000, panelClass: ['snack-bar-error'] });
            console.log(error);
          }
      );
    }
  }
}
