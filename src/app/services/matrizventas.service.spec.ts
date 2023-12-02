import { TestBed } from '@angular/core/testing';

import { MatrizventasService } from './matrizventas.service';

describe('MatrizventasService', () => {
  let service: MatrizventasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatrizventasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
