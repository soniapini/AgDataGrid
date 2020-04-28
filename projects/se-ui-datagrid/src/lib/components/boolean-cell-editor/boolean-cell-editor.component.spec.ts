import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanCellEditorComponent } from './boolean-cell-editor.component';

describe('BooleanCellEditorComponent', () => {
  let component: BooleanCellEditorComponent;
  let fixture: ComponentFixture<BooleanCellEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanCellEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanCellEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
