import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboGridComponent } from './combo-grid.component';

describe('ComboGridComponent', () => {
  let component: ComboGridComponent;
  let fixture: ComponentFixture<ComboGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
