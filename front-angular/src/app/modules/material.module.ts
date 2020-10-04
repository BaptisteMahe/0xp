import { NgModule } from '@angular/core';

import { MatSelectModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';


import { SelectAutocompleteModule } from 'mat-select-autocomplete';

@NgModule({
  exports: [
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatSliderModule,
    MatTabsModule,
    SelectAutocompleteModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
