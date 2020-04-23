import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphanumericCellEditorInlineComponent } from './alphanumeric-cell-editor-inline.component';

describe('AlphanumericCellEditorInlineComponent', () => {
  let component: AlphanumericCellEditorInlineComponent;
  let fixture: ComponentFixture<AlphanumericCellEditorInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlphanumericCellEditorInlineComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphanumericCellEditorInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
