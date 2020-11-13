import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileAdminComponent } from './profile-admin.component';

describe('AdminComponent', () => {
  let component: ProfileAdminComponent;
  let fixture: ComponentFixture<ProfileAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
