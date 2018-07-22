import { TestBed, inject } from '@angular/core/testing';

import { FonoaudiologoService } from './fonoaudiologo.service';

describe('FonoaudiologoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FonoaudiologoService]
    });
  });

  it('should be created', inject([FonoaudiologoService], (service: FonoaudiologoService) => {
    expect(service).toBeTruthy();
  }));
});
