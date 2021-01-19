import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { CompanyService, UserService } from '../../../services';
import { Company, CompanySize, User } from '../../../../models';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  currentUser: User;
  currentUserEdit: User;

  currentCompany: Company;
  currentCompanyEdit: Company;

  isEdition = false;
  editor = ClassicEditor;

  sizeList = Object.values(CompanySize);

  constructor(private userService: UserService,
              private companyService: CompanyService) { }

  ngOnInit() {
    this.userService.getCurrentUserObs().subscribe((user: User) => {

      this.currentUser = user;

      if (this.currentUser.type === 'company') {
        this.companyService.getById(this.currentUser.companyId).subscribe((company: Company) => {
          this.currentCompany = company;
        });
      }
    });
  }

  enableEdition() {
    this.isEdition = true;
    this.currentUserEdit = Object.assign({}, this.currentUser);
    if (this.currentUser.type === 'company') {
      this.currentCompanyEdit = Object.assign({}, this.currentCompany);
    }
  }

  updateProfile() {
    this.currentUser = Object.assign({}, this.currentUserEdit);

    if (this.currentUser.type === 'company') {
      this.userService.update(this.currentUser);
      this.currentCompany = Object.assign({}, this.currentCompanyEdit);
      this.companyService.editCompany(this.currentCompany).subscribe(() => {
        this.ngOnInit();
      });

    } else if (this.currentUser.type === 'student') {
      this.userService.update(this.currentUser);
      this.ngOnInit();
    }

    this.disableEdition();
  }

  disableEdition() {
    this.isEdition = false;
  }
}
