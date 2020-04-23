import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphanumericCellEditorPopupComponent } from './alphanumeric-cell-editor-popup.component';

describe('AlphanumericCellEditorPopupComponent', () => {
  let component: AlphanumericCellEditorPopupComponent;
  let fixture: ComponentFixture<AlphanumericCellEditorPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlphanumericCellEditorPopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphanumericCellEditorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
