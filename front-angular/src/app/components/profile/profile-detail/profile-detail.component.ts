import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { CompanyService, SelectService, UserService } from '../../../services';
import { Company, CompanySize, SelectOption, User } from '../../../../models';

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

  softSkillList: SelectOption[];
  selectedSoftSkillIdList = [];

  sizeList = Object.values(CompanySize);

  constructor(private userService: UserService,
              private companyService: CompanyService,
              private selectService: SelectService) { }

  ngOnInit() {
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
      if (this.currentUser.type === 'company') {
        this.companyService.getById(this.currentUser.companyId).subscribe((company: Company) => {
          this.currentCompany = company;
        });
      } else if (this.currentUser.type === 'student') {
        this.selectService.getSoftSkills().subscribe((softSkillsList: SelectOption[]) => {
          this.softSkillList = softSkillsList;
        });
        this.selectedSoftSkillIdList = this.currentUser.softSkills.map(softSkill => softSkill._id);
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
      const softSkills = [];
      this.selectedSoftSkillIdList.forEach(selectedSoftSkillId => {
        softSkills.push(this.softSkillList.find(softSkill => softSkill._id === selectedSoftSkillId));
      });
      this.currentUser.softSkills = softSkills;
      this.userService.update(this.currentUser);
      this.ngOnInit();
    }

    this.disableEdition();
  }

  disableEdition() {
    this.isEdition = false;
  }
}
