import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';

import { CompanyService } from '../../../services';
import { Company, CompanySize } from '../../../../models';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  registerForm: FormGroup;
  sizeList = Object.values(CompanySize);

  constructor(@Inject(MAT_DIALOG_DATA) public companyToEdit: Company,
              private formBuilder: FormBuilder,
              private companyService: CompanyService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [this.companyToEdit?.name, Validators.required],
      description: [this.companyToEdit?.description],
      size: [this.companyToEdit?.size],
      location: [this.companyToEdit?.location],
      srcImage: [this.companyToEdit?.srcImage],
      isPartner: [this.companyToEdit?.isPartner || false],
      contact: [this.companyToEdit?.contact, [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.companyToEdit) {
      return this.companyService.editCompany({... this.registerForm.value, _id: this.companyToEdit._id}).pipe(first());
    } else {
      return this.companyService.addCompany(this.registerForm.value).pipe(first());
    }
  }

}
