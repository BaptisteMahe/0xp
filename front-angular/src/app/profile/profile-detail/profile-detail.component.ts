import { Component, OnInit, Input } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserService } from 'src/app/logging/services';
import { SelectOption } from 'src/models/SelectOption';
import { User } from '../../../models';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  @Input() profileDetails: User;

  profileEdit: User;
  isEdition = false;
  editor = ClassicEditor;
  softSkillsList: SelectOption[];
  private currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.userService.getSoftSkillList().subscribe((softSkillsList: SelectOption[]) => {
      this.softSkillsList = softSkillsList;
    });
  }

  enableEdition() {
    this.isEdition = true;
    this.profileEdit = Object.assign({}, this.profileDetails);
    if (!this.profileDetails.isStudent) {
      this.profileEdit.creationDate = this.formatDateFromBase(this.profileDetails.creationDate);
    }
  }

  disableEdition() {
    this.isEdition = false;
    localStorage.setItem('currentUser', JSON.stringify(this.profileDetails));
    this.currentUserSubject.next(this.profileDetails);
    window.location.reload();
  }

  updateProfile() {
    this.profileDetails = Object.assign({}, this.profileEdit);
    if (!this.profileDetails.isStudent) {
      this.profileDetails.creationDate = this.formatDateToBase(this.profileEdit.creationDate);
    }
    this.userService.update(this.profileDetails);
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
