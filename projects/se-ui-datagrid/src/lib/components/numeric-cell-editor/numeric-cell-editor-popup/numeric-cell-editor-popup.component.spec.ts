import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericCellEditorPopupComponent } from './numeric-cell-editor-popup.component';

describe('NumericCellEditorPopupComponent', () => {
  let component: NumericCellEditorPopupComponent;
  let fixture: ComponentFixture<NumericCellEditorPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NumericCellEditorPopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericCellEditorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
