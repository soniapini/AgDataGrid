import { TestBed } from '@angular/core/testing';

import { GridCommonService } from './grid-common.service';

describe('GridCommonService', () => {
  let service: GridCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
