import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphanumericCellEditorComponent } from './alphanumeric-cell-editor.component';

describe('AlphanumericCellEditorComponent', () => {
  let component: AlphanumericCellEditorComponent;
  let fixture: ComponentFixture<AlphanumericCellEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlphanumericCellEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphanumericCellEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
