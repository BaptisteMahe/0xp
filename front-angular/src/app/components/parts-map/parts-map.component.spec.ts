import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsMapComponent } from './parts-map.component';

describe('PartsMapComponent', () => {
  let component: PartsMapComponent;
  let fixture: ComponentFixture<PartsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
