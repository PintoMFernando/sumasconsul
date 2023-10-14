import { TestBed } from '@angular/core/testing';

import { CentralizadorService } from './centralizador.service';

describe('CentralizadorService', () => {
  let service: CentralizadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentralizadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
