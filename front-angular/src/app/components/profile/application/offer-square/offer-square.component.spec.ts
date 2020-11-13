import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OfferSquareComponent } from './offer-square.component';

describe('OfferSquareComponent', () => {
  let component: OfferSquareComponent;
  let fixture: ComponentFixture<OfferSquareComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferSquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
