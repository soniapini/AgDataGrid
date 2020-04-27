import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowResizeComponent } from './row-resize.component';

describe('RowResizeComponent', () => {
  let component: RowResizeComponent;
  let fixture: ComponentFixture<RowResizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowResizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowResizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
