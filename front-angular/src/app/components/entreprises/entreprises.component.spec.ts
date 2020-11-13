import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntreprisesComponent } from './entreprises.component';

describe('EntreprisesComponent', () => {
  let component: EntreprisesComponent;
  let fixture: ComponentFixture<EntreprisesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntreprisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntreprisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
