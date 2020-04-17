import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterCellEditorComponent } from './letter-cell-editor.component';

describe('LetterCellEditorComponent', () => {
  let component: LetterCellEditorComponent;
  let fixture: ComponentFixture<LetterCellEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LetterCellEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterCellEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
