import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateCellEditorInlineComponent } from './date-cell-editor-inline.component';

describe('DateCellEditorInlineComponent', () => {
  let component: DateCellEditorInlineComponent;
  let fixture: ComponentFixture<DateCellEditorInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateCellEditorInlineComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateCellEditorInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
