import { TestBed } from '@angular/core/testing';

import { MespuntoventasumaService } from './mespuntoventasuma.service';

describe('MespuntoventasumaService', () => {
  let service: MespuntoventasumaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MespuntoventasumaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
