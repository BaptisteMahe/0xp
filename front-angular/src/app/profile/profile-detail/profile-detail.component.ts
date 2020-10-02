import { Component, OnInit, Input } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserService } from 'src/app/logging/services';
import { OfferViewService } from 'src/app/offers/offerView.service';
import { SelectOption } from 'src/models/SelectOption';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../models';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  @Input() profileDetails: User;

  profileEdit: User;
  isEdition: boolean;
  editor = ClassicEditor;
  softSkillsList: SelectOption[];
  private currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;

  constructor(private userService: UserService,
    private offerViewService: OfferViewService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit() {
    this.isEdition = false;

    fetch(this.offerViewService.apiUrl + '/select/softskills')
      .then(response => {
        response.json()
          .then(data => {
            this.softSkillsList = data.slice();
          });
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
