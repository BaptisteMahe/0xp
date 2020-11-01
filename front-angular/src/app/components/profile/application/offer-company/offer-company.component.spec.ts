import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCompanyComponent } from './offer-company.component';

describe('OfferCompanyComponent', () => {
  let component: OfferCompanyComponent;
  let fixture: ComponentFixture<OfferCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
