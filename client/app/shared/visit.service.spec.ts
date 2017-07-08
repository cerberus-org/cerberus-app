import { TestBed, inject } from '@angular/core/testing';

import { VisitService } from './visit.service';

describe('VisitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisitService]
    });
  });

  it('should be created', inject([VisitService], (service: VisitService) => {
    expect(service).toBeTruthy();
  }));
});
