import { TestBed } from '@angular/core/testing';

import { PuntoactividadService } from './puntoactividad.service';

describe('PuntoactividadService', () => {
  let service: PuntoactividadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuntoactividadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
