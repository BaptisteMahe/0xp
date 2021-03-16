import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';

import { CompanyService } from '../../../services';
import { Company, CompanyCategories } from '../../../../models';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  registerForm: FormGroup;

  companyCategories = CompanyCategories;

  logoAsBase64: string;

  constructor(@Inject(MAT_DIALOG_DATA) public companyToEdit: Company,
              private formBuilder: FormBuilder,
              private companyService: CompanyService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [this.companyToEdit?.name, Validators.required],
      description: [this.companyToEdit?.description],
      category: [this.companyToEdit?.category],
      location: [this.companyToEdit?.location],
      isPartner: [this.companyToEdit?.isPartner || false],
      contact: [this.companyToEdit?.contact, [Validators.required, Validators.email]],
      websiteUrl: [this.companyToEdit?.websiteUrl]
    });

    this.logoAsBase64 = this.companyToEdit?.srcImage;
  }

  onSubmit() {
    this.registerForm.value.srcImage = this?.logoAsBase64;
    if (this.companyToEdit) {
      return this.companyService.editCompany({
        ...this.registerForm.value,
        srcImage: this.logoAsBase64,
        _id: this.companyToEdit._id
      }).pipe(first());
    } else {
      return this.companyService.addCompany(this.registerForm.value).pipe(first());
    }
  }

  onLogoReady(event) {
    this.logoAsBase64 = event;
  }

}
