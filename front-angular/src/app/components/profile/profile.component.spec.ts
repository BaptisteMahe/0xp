import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { RouterModule, Router } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { AuthenticationService } from '../../services';
import { mockStudentUser, mockCompanyUser, mockAdminUser } from '../../mock/user.mock';


describe('ProfileComponent', () => {
  let fixture: ComponentFixture<ProfileComponent>;
  let component: ProfileComponent;
  let element: any;

  let authenticationService: AuthenticationService;
  let router: Router;
  let routerSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        ProfileComponent
      ],
      providers: [
        HttpClient,
        HttpHandler
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    authenticationService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
    routerSpy = spyOn(router, 'navigateByUrl');
  });

  it('should create the component', () => {
    spyOnProperty(authenticationService, 'currentUser', 'get').and.returnValue(of(mockStudentUser));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should logout when logout button is pressed', () => {
    spyOnProperty(authenticationService, 'currentUser', 'get').and.returnValue(of(mockStudentUser));
    fixture.detectChanges();

    const logoutSpy = spyOn(authenticationService, 'logout');

    element.querySelector('.logout a').click();

    expect(logoutSpy).toHaveBeenCalled();
  });

  it('should redirect to /login when logout button is pressed', () => {
    spyOnProperty(authenticationService, 'currentUser', 'get').and.returnValue(of(mockStudentUser));
    fixture.detectChanges();

    element.querySelector('.logout a').click();

    const url = routerSpy.calls.first().args[0];

    expect(url.toString()).toBe('/login');
  });

  describe('User image', () => {

    it('should display default image if the currentUser don\'t have any image', () => {
      spyOnProperty(authenticationService, 'currentUser', 'get').and.returnValue(of(mockStudentUser));
      fixture.detectChanges();

      const imgUrl = element.querySelector('.img-center').getAttribute('src');

      expect(imgUrl).toBe('../../assets/images/0xpuser.png');
    });

    it('should display user image if the currentUser have one', () => {
      spyOnProperty(authenticationService, 'currentUser', 'get').and.returnValue(of({
        ...mockStudentUser,
        srcImage: 'test/path/to/the/image'
      }));
      fixture.detectChanges();

      const imgUrl = element.querySelector('.img-center').getAttribute('src');

      expect(imgUrl).toBe('test/path/to/the/image');
    });
  });

  describe('Student profile', () => {

    beforeEach(() => {
      spyOnProperty(authenticationService, 'currentUser', 'get').and.returnValue(of(mockStudentUser));
      fixture.detectChanges();
    });

    it('should load favorites and notifications', () => {
      expect(element.querySelector('app-offer-square')).toBeTruthy();
      expect(element.querySelector('app-notification')).toBeTruthy();
    });

    it('should ask to add softSkills if none are found', () => {
      expect(element.querySelector('.messageProfil')).toBeTruthy();
    });
  });

  describe('Company profile', () => {

    beforeEach(() => {
      spyOnProperty(authenticationService, 'currentUser', 'get').and.returnValue(of(mockCompanyUser));
      fixture.detectChanges();
    });

    it('should load offres and notifications', () => {
      expect(element.querySelector('app-offer-company')).toBeTruthy();
      expect(element.querySelector('app-notification')).toBeTruthy();
    });
  });

  describe('Admin profile', () => {

    beforeEach(() => {
      spyOnProperty(authenticationService, 'currentUser', 'get').and.returnValue(of(mockAdminUser));
      fixture.detectChanges();
    });

    it('should load admin profile', () => {
      expect(element.querySelector('app-profile-admin')).toBeTruthy();
    });
  });
});
