import { TestBed, inject } from '@angular/core/testing';

import { AppUpdateService } from './app-update.service';

describe('AppUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppUpdateService]
    });
  });

  it('should be created', inject([AppUpdateService], (service: AppUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
