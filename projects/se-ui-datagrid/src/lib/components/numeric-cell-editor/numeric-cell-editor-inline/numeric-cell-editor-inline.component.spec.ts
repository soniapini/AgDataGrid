import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericCellEditorInlineComponent } from './numeric-cell-editor-inline.component';

describe('NumericCellEditorInlineComponent', () => {
  let component: NumericCellEditorInlineComponent;
  let fixture: ComponentFixture<NumericCellEditorInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NumericCellEditorInlineComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericCellEditorInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
