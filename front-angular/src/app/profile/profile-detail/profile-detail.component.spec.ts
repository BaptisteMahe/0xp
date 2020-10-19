import { HttpClient, HttpHandler } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { MaterialModule } from '../../modules/material.module';
import { ProfileDetailComponent } from './profile-detail.component';
import { UserService } from 'src/app/logging/services';
import { mockStudentUser, mockSoftSkillList } from 'src/app/mock/user.mock';

describe('ProfileDetailComponent', () => {
  let fixture: ComponentFixture<ProfileDetailComponent>;
  let component: ProfileDetailComponent;
  let element: any;

  let router: Router;
  let userService: UserService;

  let routerUpdateRoute: jasmine.Spy;
  let userUpdateSpy: jasmine.Spy;
  let softSkillListSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [
        ProfileDetailComponent
      ],
      providers: [
        HttpClient,
        HttpHandler
      ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDetailComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    routerUpdateRoute = spyOn(router, 'navigateByUrl');
    softSkillListSpy = spyOn(userService, 'getSoftSkillList').and.returnValue(of(mockSoftSkillList));
    userUpdateSpy = spyOn(userService, 'update');
  });

  it('should create the component', () => {
    component.profileDetails = mockStudentUser;

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('Student Profile Detail', () => {

    beforeEach(() => {
      component.profileDetails = mockStudentUser;
      fixture.detectChanges();
    });

    it('should load soft skill list on init', () => {
      expect(softSkillListSpy).toHaveBeenCalled();
    });

    it('should display a message only if no soft skill is set', () => {
      expect(element.querySelector('.message-profil')).toBeTruthy();

      component.profileDetails = {...mockStudentUser, softSkills: mockSoftSkillList.map(softSkill => softSkill.value)};
      fixture.detectChanges();
      expect(element.querySelector('.message-profil')).toBeFalsy();
    });

    it('should enable edit when clicking on the edit-profile-button', () => {
      element.querySelector('.edit-profile-button').click();
      expect(component.isEdition).toBeTruthy();
      fixture.detectChanges();

      expect(element.querySelector('.profile-edition')).toBeTruthy();
    });

    describe('EditEnable', () => {

      let softSkillSelect;
      const softSkills = ['patience', 'organisation', 'motivation', 'empathie', 'gestion du stress'];

      function injectInput(filterName: string, mockedValue: string) {
        const filterElement = element.querySelector(`input[name="${filterName}"]`);
        filterElement.value = mockedValue;
        filterElement.dispatchEvent(new Event('input'));
      }

      beforeEach(() => {
        component.enableEdition();
        fixture.detectChanges();

        softSkillSelect = element.querySelector('mat-select[name="soft-skill-select"]');
      });

      it('should start from the current profile detail', () => {
        expect(component.profileEdit).toEqual(component.profileDetails);
      });

      it('should edit first name', () => {
        injectInput('first-name-input', 'MockedFirstName');
        fixture.detectChanges();
        expect(component.profileEdit.firstName).toBe('MockedFirstName');
      });

      it('should edit name', () => {
        injectInput('name-input', 'MockedName');
        fixture.detectChanges();
        expect(component.profileEdit.name).toBe('MockedName');
      });

      it('should edit date of birth', () => {
        injectInput('date-birth-input', '1997-11-11');
        fixture.detectChanges();
        expect(component.profileEdit.dateBirth).toBe('1997-11-11');
      });

      it('should edit location', () => {
        injectInput('location-input', 'Toulouse');
        fixture.detectChanges();
        expect(component.profileEdit.location).toBe('Toulouse');
      });

      it('should contact mail', () => {
        injectInput('contact-mail-input', 'test@mail.com');
        fixture.detectChanges();
        expect(component.profileEdit.contactMail).toBe('test@mail.com');
      });

      it('should edit contact tel', () => {
        injectInput('contact-tel-input', '0682318704');
        fixture.detectChanges();
        expect(component.profileEdit.contactTel).toBe('0682318704');
      });

      it('should be able to edit soft skills', waitForAsync(() => {
        softSkillSelect.click();
        fixture.detectChanges();
        softSkills.forEach((softSkill) => {
          fixture.debugElement.query(By.css(`mat-option[ng-reflect-value="${softSkill}"]`)).nativeElement.click();
          fixture.detectChanges();
        });
        expect(component.profileEdit.softSkills).toEqual(softSkills);
      }));

      it('should update the Profile of the user ', waitForAsync(() => {
        injectInput('first-name-input', 'MockedFirstName');
        injectInput('name-input', 'MockedName');
        injectInput('date-birth-input', '1997-11-11');
        injectInput('location-input', 'Toulouse');
        injectInput('contact-mail-input', 'test@mail.com');
        injectInput('contact-tel-input', '0682318704');
        fixture.detectChanges();
        softSkillSelect.click();
        fixture.detectChanges();
        softSkills.forEach((softSkill) => {
          fixture.debugElement.query(By.css(`mat-option[ng-reflect-value="${softSkill}"]`)).nativeElement.click();
          fixture.detectChanges();
        });
        element.querySelector('.btn-success').click();
        fixture.detectChanges();
        expect(userUpdateSpy).toHaveBeenCalledWith({
          ...mockStudentUser,
          firstName: 'MockedFirstName',
          name: 'MockedName',
          dateBirth: '1997-11-11',
          location: 'Toulouse',
          contactMail: 'test@mail.com',
          contactTel: '0682318704',
          softSkills: ['patience', 'organisation', 'motivation', 'empathie', 'gestion du stress']
        });
        expect(component.isEdition).toBeFalsy();
      }));
    });
  });

});
