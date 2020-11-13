import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OfferDetailComponent } from './offer-detail.component';

describe('OfferDetailComponent', () => {
  let component: OfferDetailComponent;
  let fixture: ComponentFixture<OfferDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
