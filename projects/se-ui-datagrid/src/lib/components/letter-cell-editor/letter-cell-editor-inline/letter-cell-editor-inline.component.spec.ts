import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterCellEditorInlineComponent } from './letter-cell-editor-inline.component';

describe('LetterCellEditorInlineComponent', () => {
  let component: LetterCellEditorInlineComponent;
  let fixture: ComponentFixture<LetterCellEditorInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LetterCellEditorInlineComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterCellEditorInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
