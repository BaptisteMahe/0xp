import { Component, OnInit, Input } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserService } from 'src/app/logging/services';
import { OfferViewService } from 'src/app/offers/offerView.service';
import { SelectOption } from 'src/models/SelectOption';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  @Input() details: any;
  @Input() type: boolean;

  profileEdit: any;
  isStudent: boolean;
  isEdition: boolean;
  editor = ClassicEditor;
  softSkillsList: SelectOption[]
  private currentUserSubject: BehaviorSubject<any>;
  currentUser: Observable<any>;

  constructor(private userService: UserService,
    private offerViewService: OfferViewService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit() {
    this.isEdition = false;
    this.isStudent = this.details.isStudent;

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
    this.profileEdit = Object.assign({}, this.details);
    if (!this.type) {
      this.profileEdit.date_of_creation = this.formatDateFromBase(this.details.date_of_creation)
    }
  }

  disableEdition() {
    this.isEdition = false;
    localStorage.setItem('currentUser', JSON.stringify(this.details));
    this.currentUserSubject.next(this.details);
    window.location.reload();
  }

  updateProfile() {
    this.details = Object.assign({}, this.profileEdit);
    if (!this.type) {
      this.details.date_of_creation = this.formatDateToBase(this.profileEdit.date_of_creation);
    }
    this.userService.update(this.details);
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
