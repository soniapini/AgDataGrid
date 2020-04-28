import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanCellEditorInlineComponent } from './boolean-cell-editor-inline.component';

describe('BooleanCellEditorInlineComponent', () => {
  let component: BooleanCellEditorInlineComponent;
  let fixture: ComponentFixture<BooleanCellEditorInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanCellEditorInlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanCellEditorInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
