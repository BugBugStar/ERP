import { TestBed } from '@angular/core/testing';

import { InputTableService } from './input-table.service';

describe('InputTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputTableService = TestBed.get(InputTableService);
    expect(service).toBeTruthy();
  });
});
