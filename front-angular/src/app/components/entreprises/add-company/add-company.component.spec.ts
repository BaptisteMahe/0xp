import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddCompanyComponent } from './add-company.component';

describe('AddCompanyComponent', () => {
  let component: AddCompanyComponent;
  let fixture: ComponentFixture<AddCompanyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
