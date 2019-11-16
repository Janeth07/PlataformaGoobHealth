import { TestBed, inject } from '@angular/core/testing';

import { RegistrarService } from './registrar.service';

describe('ReportesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrarService]
    });
  });

  it('should be created', inject([RegistrarService], (service: RegistrarService) => {
    expect(service).toBeTruthy();
  }));
});
