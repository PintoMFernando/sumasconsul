import { TestBed } from '@angular/core/testing';

import { TalonarioselectronicosService } from './talonarioselectronicos.service';

describe('TalonarioselectronicosService', () => {
  let service: TalonarioselectronicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TalonarioselectronicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
