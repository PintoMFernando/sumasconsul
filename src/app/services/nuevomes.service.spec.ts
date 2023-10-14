import { TestBed } from '@angular/core/testing';

import { NuevomesService } from './nuevomes.service';

describe('NuevomesService', () => {
  let service: NuevomesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevomesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
