import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDateCellComponent } from './custom-date-cell.component';

describe('CustomDateCellComponent', () => {
  let component: CustomDateCellComponent;
  let fixture: ComponentFixture<CustomDateCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDateCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDateCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
