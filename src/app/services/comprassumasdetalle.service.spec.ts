import { TestBed } from '@angular/core/testing';

import { ComprassumasdetalleService } from './comprassumasdetalle.service';

describe('ComprassumasdetalleService', () => {
  let service: ComprassumasdetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprassumasdetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
