import { TestBed, inject } from '@angular/core/testing';

import { CobradoresService } from './cobradores.service';

describe('CobradoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CobradoresService]
    });
  });

  it('should be created', inject([CobradoresService], (service: CobradoresService) => {
    expect(service).toBeTruthy();
  }));
});
