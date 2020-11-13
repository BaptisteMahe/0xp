import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AvisOverviewComponent } from './avis-overview.component';

describe('AvisOverviewComponent', () => {
  let component: AvisOverviewComponent;
  let fixture: ComponentFixture<AvisOverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
