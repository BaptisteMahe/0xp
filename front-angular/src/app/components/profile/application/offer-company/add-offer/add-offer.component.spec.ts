import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddOfferComponent } from './add-offer.component';

describe('AddOfferComponent', () => {
  let component: AddOfferComponent;
  let fixture: ComponentFixture<AddOfferComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

