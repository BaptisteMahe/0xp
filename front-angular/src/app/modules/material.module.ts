import { NgModule } from '@angular/core';

import { MatSelectModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material';

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
        SelectAutocompleteModule
    ]
})
export class MaterialModule { }
