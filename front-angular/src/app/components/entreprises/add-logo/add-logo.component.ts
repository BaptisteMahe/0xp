import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Canvg, presets } from 'canvg';
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
    this.fileReader.onerror = (error) => {
      this.matSnackBar.open('An error occurred with your image', null, { duration: 3000, panelClass: ['snack-bar-error'] });
      console.log(error);
    };
  }

  onImgChange(event) {
    const file = event.target.files[0];

    if (file) {

      if (file.type.includes('svg')) {

        const canvas = new OffscreenCanvas(ImageSize.MaxHeight, ImageSize.MaxWidth);
        const ctx = canvas.getContext('2d');

        this.fileReader.readAsText(file);
        this.fileReader.onload = () => {
          Canvg.from(ctx, this.fileReader.result.toString(), presets.offscreen()).then((result) => {
            result.render().then(() => {
              canvas.convertToBlob().then((blob) => {
                this.resizeAndConvertToBase64(blob as File);
              });
            });
          });
        };

      } else {
        this.resizeAndConvertToBase64(file);
      }
    }
  }

  resizeAndConvertToBase64(file: File) {
    this.ng2ImgMaxService.resizeImage(file, ImageSize.MaxWidth, ImageSize.MaxHeight).subscribe(
        result => {
          this.fileReader.readAsDataURL(result);

          this.fileReader.onload = () => {
            this.logoAsBase64 = this.fileReader.result.toString();
            this.logoReadyEvent.emit(this.fileReader.result.toString());
          };
        }, error => {
          this.matSnackBar.open(error.reason, null, { duration: 3000, panelClass: ['snack-bar-error'] });
          console.log(error);
        }
    );
  }
}
