import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanCellEditorBaseComponent } from './boolean-cell-editor-base.component';

describe('BooleanCellEditorBaseComponent', () => {
  let component: BooleanCellEditorBaseComponent;
  let fixture: ComponentFixture<BooleanCellEditorBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanCellEditorBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanCellEditorBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
