import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';

import { UserService } from '../../../services';
import { SelectOption, User } from '../../../../models';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  currentUser: User;
  currentUserEdit: User;

  isEdition = false;
  editor = ClassicEditor;
  softSkillsList: SelectOption[];

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });
    this.userService.getSoftSkillList().subscribe((softSkillsList: SelectOption[]) => {
      this.softSkillsList = softSkillsList;
    });
  }

  enableEdition() {
    this.isEdition = true;
    this.currentUserEdit = Object.assign({}, this.currentUser);
    if (!this.currentUser.isStudent) {
      this.currentUserEdit.creationDate = this.formatDateFromBase(this.currentUser.creationDate);
    }
  }

  disableEdition() {
    this.isEdition = false;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    // TODO : Only reload component
    this.router.navigate(['/profile']);
  }

  updateProfile() {
    this.currentUser = Object.assign({}, this.currentUserEdit);
    if (!this.currentUser.isStudent) {
      this.currentUser.creationDate = this.formatDateToBase(this.currentUserEdit.creationDate);
    }
    this.userService.update(this.currentUser);
    this.disableEdition();
  }

  formatDateFromBase(dateBase) {
    const date = dateBase.split('/');
    return date[2] + '-' + date[1] + '-' + date[0];
  }
  formatDateToBase(date) {
    const dateBase = date.split('-');
    return dateBase[2] + '/' + dateBase[1] + '/' + dateBase[0];
  }

}
