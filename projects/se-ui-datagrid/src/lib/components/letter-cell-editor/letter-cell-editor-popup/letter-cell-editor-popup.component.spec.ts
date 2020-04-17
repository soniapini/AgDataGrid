import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterCellEditorPopupComponent } from './letter-cell-editor-popup.component';

describe('LetterCellEditorPopupComponent', () => {
  let component: LetterCellEditorPopupComponent;
  let fixture: ComponentFixture<LetterCellEditorPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LetterCellEditorPopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterCellEditorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
