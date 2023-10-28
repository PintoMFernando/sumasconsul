import { TestBed } from '@angular/core/testing';

import { SumatalonarioService } from './sumatalonario.service';

describe('SumatalonarioService', () => {
  let service: SumatalonarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SumatalonarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
