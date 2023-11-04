import { TestBed } from '@angular/core/testing';

import { OtrossumasService } from './otrossumas.service';

describe('OtrossumasService', () => {
  let service: OtrossumasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtrossumasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
