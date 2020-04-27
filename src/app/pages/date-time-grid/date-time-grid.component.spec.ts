import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeGridComponent } from './date-time-grid.component';

describe('DateTimeGridComponent', () => {
  let component: DateTimeGridComponent;
  let fixture: ComponentFixture<DateTimeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateTimeGridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
