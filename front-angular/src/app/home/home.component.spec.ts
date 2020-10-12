import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthenticationService } from '../logging/services';
import { mockStudentUser } from '../mock/user.mock';
import { User } from 'src/models/user';



fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authenticationService: AuthenticationService;

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
    authenticationService = TestBed.inject(AuthenticationService);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the current User', () => {
    spyOnProperty(authenticationService, 'currentUser', 'get').and.returnValue(of(mockStudentUser));
    fixture.detectChanges();
    expect(component.currentUser).toBe(mockStudentUser);
  });
});
