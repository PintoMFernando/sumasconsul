import { TestBed } from '@angular/core/testing';

import { EmpresadatosinicialesService } from './empresadatosiniciales.service';

describe('EmpresadatosinicialesService', () => {
  let service: EmpresadatosinicialesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresadatosinicialesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
