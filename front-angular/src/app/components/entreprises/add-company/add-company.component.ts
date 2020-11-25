import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';

import { CompanyService } from '../../../services';
import { Company } from '../../../../models';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  registerForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public company: Company,
              private formBuilder: FormBuilder,
              private companyService: CompanyService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [this.company?.name, Validators.required],
      isStudent: [false],
      creationDate: [this.company?.creationDate, Validators.required],
      description: [this.company?.description, Validators.required],
      taille: [this.company?.taille, Validators.required],
      location: [this.company?.location, Validators.required],
      srcImage: [this.company?.srcImage],
      isPartner: []
    });
  }

  onSubmit() {
    return this.companyService.addCompany(this.registerForm.value).pipe(first());
  }

}
