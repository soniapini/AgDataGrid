import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleansComponent } from './booleans.component';

describe('BooleansComponent', () => {
  let component: BooleansComponent;
  let fixture: ComponentFixture<BooleansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
