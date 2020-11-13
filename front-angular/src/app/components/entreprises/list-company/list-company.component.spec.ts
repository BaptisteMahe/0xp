import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListCompanyComponent } from './list-company.component';

describe('ListCompanyComponent', () => {
  let component: ListCompanyComponent;
  let fixture: ComponentFixture<ListCompanyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
