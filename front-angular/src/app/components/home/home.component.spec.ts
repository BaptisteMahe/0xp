import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { RouterModule, Router } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthenticationService } from '../../services';
import { mockStudentUser } from '../../mock/user.mock';




describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let element: any;

  let authenticationService: AuthenticationService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        HomeComponent
      ],
      providers: [
        HttpClient,
        HttpHandler
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    authenticationService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the current User', () => {
    spyOnProperty(authenticationService, 'currentUser', 'get').and.returnValue(of(mockStudentUser));
    fixture.detectChanges();
    expect(component.currentUser).toBe(mockStudentUser);
  });

  describe('Header button', () => {

    const buttonQuery = '.logo-header .redirect-button a';
    let routerSpy: jasmine.Spy;

    beforeEach(() => {
      routerSpy = spyOn(router, 'navigateByUrl');
    });

    it('should redirect to /offers when user is logged in', () => {
      spyOnProperty(authenticationService, 'currentUser', 'get').and.returnValue(of(mockStudentUser));
      fixture.detectChanges();
      element.querySelector(buttonQuery).click();

      const url = routerSpy.calls.first().args[0];

      expect(url.toString()).toBe('/offers');
    });

    it('should redirect to /login when user is not logged in', () => {
      spyOnProperty(authenticationService, 'currentUser', 'get').and.returnValue(of(null));
      fixture.detectChanges();
      element.querySelector(buttonQuery).click();

      const url = routerSpy.calls.first().args[0];

      expect(url.toString()).toBe('/login');
    });
  });

  describe('Footer button', () => {

    const buttonQuery = '.footer .redirect-button';
    let routerSpy: jasmine.Spy;

    beforeEach(() => {
      routerSpy = spyOn(router, 'navigateByUrl');
    });

    it('should redirect to /offers when user is logged in', () => {
      spyOnProperty(authenticationService, 'currentUser', 'get').and.returnValue(of(mockStudentUser));
      fixture.detectChanges();
      element.querySelector(buttonQuery).click();

      const url = routerSpy.calls.first().args[0];

      expect(url.toString()).toBe('/offers');
    });

    it('should redirect to /login when user is not logged in', () => {
      spyOnProperty(authenticationService, 'currentUser', 'get').and.returnValue(of(null));
      fixture.detectChanges();
      element.querySelector(buttonQuery).click();

      const url = routerSpy.calls.first().args[0];

      expect(url.toString()).toBe('/login');
    });
  });
});
