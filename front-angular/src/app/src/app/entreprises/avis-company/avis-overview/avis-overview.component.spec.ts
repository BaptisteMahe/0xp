import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisOverviewComponent } from './avis-overview.component';

describe('AvisOverviewComponent', () => {
  let component: AvisOverviewComponent;
  let fixture: ComponentFixture<AvisOverviewComponent>;

  beforeEach(async(() => {
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
