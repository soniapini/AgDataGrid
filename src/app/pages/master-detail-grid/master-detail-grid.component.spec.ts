import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDetailGridComponent } from './master-detail-grid.component';

describe('MasterDetailGridComponent', () => {
  let component: MasterDetailGridComponent;
  let fixture: ComponentFixture<MasterDetailGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterDetailGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDetailGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
