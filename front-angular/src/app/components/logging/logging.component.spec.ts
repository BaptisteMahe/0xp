import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoggingComponent } from './logging.component';

describe('LoggingComponent', () => {
  let component: LoggingComponent;
  let fixture: ComponentFixture<LoggingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
