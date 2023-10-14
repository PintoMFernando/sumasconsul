import { TestBed } from '@angular/core/testing';

import { CentralizadormesService } from './centralizadormes.service';

describe('CentralizadormesService', () => {
  let service: CentralizadormesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentralizadormesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
