import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AvisCompanyComponent } from './avis-company.component';

describe('AvisCompanyComponent', () => {
  let component: AvisCompanyComponent;
  let fixture: ComponentFixture<AvisCompanyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
