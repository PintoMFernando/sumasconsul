import { TestBed } from '@angular/core/testing';

import { ServicioConexionService } from './servicio-conexion.service';

describe('ServicioConexionService', () => {
  let service: ServicioConexionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioConexionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
