import { TestBed } from '@angular/core/testing';

import { VentatalonarioService } from './ventatalonario.service';

describe('VentatalonarioService', () => {
  let service: VentatalonarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentatalonarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
