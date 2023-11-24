import { TestBed } from '@angular/core/testing';

import { CalculocentralizadormesService } from './calculocentralizadormes.service';

describe('CalculocentralizadormesService', () => {
  let service: CalculocentralizadormesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculocentralizadormesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
