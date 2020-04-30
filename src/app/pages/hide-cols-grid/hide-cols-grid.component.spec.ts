import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HideColsComponent } from './hide-cols.component';

describe('HideColsComponent', () => {
  let component: HideColsComponent;
  let fixture: ComponentFixture<HideColsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HideColsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HideColsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
