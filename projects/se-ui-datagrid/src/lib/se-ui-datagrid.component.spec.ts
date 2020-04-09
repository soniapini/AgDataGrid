import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeUiDatagridComponent } from './se-ui-datagrid.component';

describe('SeUiDatagridComponent', () => {
  let component: SeUiDatagridComponent;
  let fixture: ComponentFixture<SeUiDatagridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeUiDatagridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeUiDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
