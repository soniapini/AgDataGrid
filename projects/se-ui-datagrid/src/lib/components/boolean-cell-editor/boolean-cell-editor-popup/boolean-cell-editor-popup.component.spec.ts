import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanCellEditorPopupComponent } from './boolean-cell-editor-popup.component';

describe('BooleanCellEditorPopupComponent', () => {
  let component: BooleanCellEditorPopupComponent;
  let fixture: ComponentFixture<BooleanCellEditorPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanCellEditorPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanCellEditorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
