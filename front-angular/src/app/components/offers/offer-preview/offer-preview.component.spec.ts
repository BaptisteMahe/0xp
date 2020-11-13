import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OfferPreviewComponent } from './offer-preview.component';

describe('OfferPreviewComponent', () => {
  let component: OfferPreviewComponent;
  let fixture: ComponentFixture<OfferPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
