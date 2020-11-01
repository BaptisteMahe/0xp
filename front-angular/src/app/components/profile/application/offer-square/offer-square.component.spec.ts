import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferSquareComponent } from './offer-square.component';

describe('OfferSquareComponent', () => {
  let component: OfferSquareComponent;
  let fixture: ComponentFixture<OfferSquareComponent>;

  beforeEach(async(() => {
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
