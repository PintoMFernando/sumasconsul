import { TestBed } from '@angular/core/testing';

import { PuntoventaactividadService } from './puntoventaactividad.service';

describe('PuntoventaactividadService', () => {
  let service: PuntoventaactividadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuntoventaactividadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
