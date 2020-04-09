import { TestBed } from '@angular/core/testing';

import { SeUiDatagridService } from './se-ui-datagrid.service';

describe('SeUiDatagridService', () => {
  let service: SeUiDatagridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeUiDatagridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
