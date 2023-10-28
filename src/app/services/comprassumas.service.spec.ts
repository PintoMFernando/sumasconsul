import { TestBed } from '@angular/core/testing';

import { ComprassumasService } from './comprassumas.service';

describe('ComprassumasService', () => {
  let service: ComprassumasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprassumasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
